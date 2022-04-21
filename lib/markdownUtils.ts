// Ref: https://github.com/mildronize/mildronize.github.io/blob/main/scripts/utils.ts

import fs from 'fs/promises';
import path from 'path';
const markdownExt = /\.md$/;

// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
export const asyncFilter = async (arr: any, predicate: any) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v: any, index: any) => results[index]);
};

async function getDirsRecursive(
  targetPath: string,
  currentDir: string,
  markdownPaths: string[]
) {
  const currentPath = path.join(targetPath, currentDir);
  const files = (await fs.readdir(path.resolve(currentPath))) || [];
  if (files.length === 0) return [];

  // Add found markdown files
  markdownPaths.push(
    ...files
      .filter((file) => markdownExt.test(file))
      .map((file) => path.join(currentDir, file))
  );

  const dirs = await asyncFilter(files, async (file: any) => {
    const absolutePath = path.resolve(currentPath, file);
    const stat = await fs.lstat(absolutePath);
    return stat.isDirectory();
  });

  // Find in deep each directory
  for (const dir of dirs) {
    await getDirsRecursive(
      targetPath,
      path.join(currentDir, dir),
      markdownPaths
    );
  }

  return markdownPaths;
}

export async function getAllMarkdownPaths(targetPath: string) {
  try {
    return await getDirsRecursive(targetPath, '', []);
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
  }
  return [];
}
