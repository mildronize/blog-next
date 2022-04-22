import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { promisify } from 'util';
import _glob from 'glob';

import siteMetadata from '@/data/siteMetadata';
import { getActualFilename } from './pathUtility';

const glob = promisify(_glob);

export function getPostBySlug(slug: string, fields: string[] = []) {
  const fullPath = path.resolve(siteMetadata.posts.directory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Record<string, any> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []) {
  const { directory } = siteMetadata.posts;
  const mdPaths = await glob(path.join(directory, '**/*.md'));
  console.log(mdPaths);
  const posts = mdPaths
    // convert path to slug
    .map((contentPath) => getActualFilename(directory, contentPath))
    // Get Post Data by Slug
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  // console.log(posts)
  return posts;
}
