import glob from "tiny-glob";
import matter from "gray-matter";
import fs from "fs-extra";
import path from "node:path";
import toml from "@iarna/toml";

type MarkdownType = 'regular' | 'nested';

/**
 * Supported front matter fields for Zola.
 * https://www.getzola.org/documentation/content/page/#front-matter
 */

const zolaFrontMatter = [
  "title",
  "description",
  "slug",
  "path",
  "date",
  "updated",
  "weight",
  "draft",
  "render",
  "aliases",
  "authors",
  "in_search_index",
  "template",
  "taxonomies",
];


/**
 * Make sure the front matter fields are valid for Zola.
 * Otherwise move them to the "extra" field.
 * 
 * If the "categories" and "tags" fields are present, move them to "taxonomies". 
 * @param data 
 */
function processFrontmatter(data: Record<string, unknown>): Record<string, any> {
  const frontmatter: Record<string, any> = {};
  const extra: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (zolaFrontMatter.includes(key)) {
      frontmatter[key] = value;
    } else {
      extra[key] = value;
    }
  }

  if (data['categories'] || data['tags']) {
    frontmatter['taxonomies'] = {
      categories: data['categories'],
      tags: data['tags']
    };
    if (frontmatter['taxonomies']['categories']) {
      if (frontmatter['taxonomies']['categories'].length > 1) {
        frontmatter['taxonomies']['categories'] = frontmatter['taxonomies']['categories'][0];
      }
      if (frontmatter['taxonomies']['categories'][0] === 'en' || frontmatter['taxonomies']['categories'][0] === 'th') {
        delete frontmatter['taxonomies']['categories'];
      }
    }
  }

  // If there is no categories, use the first tag as the category
  if (frontmatter['taxonomies'] && frontmatter['taxonomies']['tags'] && !frontmatter['taxonomies']['categories']) {
    frontmatter['taxonomies']['categories'] = [frontmatter['taxonomies']['tags'][0]];
  }

  delete extra['language'];
  delete extra['toc'];
  delete extra['featured'];

  if (Object.keys(extra).length > 0) {
    frontmatter['extra'] = extra;
    delete frontmatter['extra']['categories'];
    delete frontmatter['extra']['tags'];
  }

  return frontmatter;
}

/**
 * Extracts the date from the filename if it starts with YYYY-MM-DD.
 * @param filename - The name of the file.
 * @returns The extracted date as a string or undefined if not found.
 */
function extractDateFromFilename(filename: string): string | undefined {
  const datePattern = /^\d{4}-\d{2}-\d{2}/;
  const match = filename.match(datePattern);
  return match ? match[0] : undefined;
}

async function processFiles(sourceDirs: string[], targetDir: string) {

  try {
    // Ensure the target directory exists
    await fs.ensureDir(targetDir);

    for (const dir of sourceDirs) {

      // Find all files in the directory
      const files = await glob(`${dir}/**/*`, { filesOnly: true });

      for (const file of files) {
        // Determine the relative path from the source directory
        let relativePath = path.relative(dir, file);

        // Classify the markdown file
        const markdownType: MarkdownType = relativePath.includes(path.sep) ? 'nested' : 'regular';

        // Construct the output file path
        let targetPath = path.join(targetDir, relativePath);

        // Ensure the target subdirectory exists
        await fs.ensureDir(path.dirname(targetPath));

        if (path.extname(file).toLowerCase() === '.md') {
          if (markdownType === 'nested') {
            relativePath = path.join(path.dirname(relativePath), 'index.md');
            targetPath = path.join(targetDir, relativePath);
          }
          // Read and process Markdown file
          const content = await fs.readFile(file, 'utf8');
          const { data, content: body } = matter(content);
          data['date'] = extractDateFromFilename(path.basename(file)) ?? data['date'];
          const frontmatter = processFrontmatter(data);

          // const output = `---\n${yaml.stringify(frontmatter)}---\n${body}`;
          const output = `+++\n${toml.stringify(frontmatter)}+++\n${body}`;

          if(frontmatter.taxonomies && !frontmatter.taxonomies.categories) {
            console.log(`No categories: ${targetPath}, `);
          }
          if(!frontmatter.taxonomies) {
            console.log(`No taxonomies: ${targetPath}, `);
          }

          await fs.writeFile(targetPath, output, 'utf8');
          console.log(`Processed (${markdownType} Markdown): ${file} -> ${targetPath}`);
        } else {
          // Copy other file types
          await fs.copyFile(file, targetPath);
          console.log(`Copied File: ${file} -> ${targetPath}`);
        }
      }
    }

    console.log('All files processed successfully!');
  } catch (error) {
    console.error('Error processing files:', error);
  }
}


// Example usage
const sourceDirectories = ["../contents/posts"];
// const targetDirectory = "../../blog-v8/content/posts";
const targetDirectory = "./output";
await fs.remove(targetDirectory);
processFiles(sourceDirectories, targetDirectory);

