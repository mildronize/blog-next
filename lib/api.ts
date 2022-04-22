import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { promisify } from 'util';
import _glob from 'glob';

import siteMetadata from '@/data/siteMetadata';

const glob = promisify(_glob);
const markdownExt = /\.md$/;

export function getPostBySlug(slug: string, fields = []) {
  const realSlug = slug.replace(markdownExt, '');
  const fullPath = path.resolve(siteMetadata.postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Record<string, any> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
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

export async function getAllPosts(fields = []) {
  const { postsDirectory } = siteMetadata;
  const mdPaths = await glob(path.join(postsDirectory, '**/*.md'));
  const posts = mdPaths
    // remove parent dir
    .map((path) => path.replace(new RegExp(`${postsDirectory}/*`), ''))
    // convert path to slug
    .map((path) => getPostBySlug(path, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
