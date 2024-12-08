import glob from "tiny-glob";
import matter from "gray-matter";
import fs from "fs-extra";
import path from "node:path";
import toml from "@iarna/toml";

type MarkdownType = 'regular' | 'nested';

async function processFiles(sourceDirs: string[], targetDir: string) {
  await fs.remove(targetDir);
  try {
    // Ensure the target directory exists
    await fs.ensureDir(targetDir);

    for (const dir of sourceDirs) {

      // Find all files in the directory
      const files = await glob(`${dir}/**/*`, { filesOnly: true });

      for (const file of files) {
        // Determine the relative path from the source directory
        const relativePath = path.relative(dir, file);

        // Classify the markdown file
        const markdownType: MarkdownType = relativePath.includes(path.sep) ? 'nested' : 'regular';

        // Construct the output file path
        const targetPath = path.join(targetDir, relativePath);

        // Ensure the target subdirectory exists
        await fs.ensureDir(path.dirname(targetPath));

        if (path.extname(file).toLowerCase() === '.md') {
          // Read and process Markdown file
          const content = await fs.readFile(file, 'utf8');
          const { data, content: body } = matter(content);
          const output = `+++\n${toml.stringify(data)}+++\n${body}`;
          
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
const targetDirectory = "./output";

processFiles(sourceDirectories, targetDirectory);

