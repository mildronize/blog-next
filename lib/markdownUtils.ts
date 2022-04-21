// Ref: https://github.com/mildronize/mildronize.github.io/blob/main/scripts/utils.ts

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);
const markdownExt = /\.md$/;

// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
export const asyncFilter = async (arr: any, predicate: any) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v: any, index: any) => results[index]);
};

async function getAllDirs(directoryAbsolutePath: string, ignoreDirs: RegExp[]) {
  let files = (await readdir(directoryAbsolutePath)) || [];
  // Ignore dirs following regex pattern
  ignoreDirs.forEach((ignoreDir) => {
    files = files.filter((file) => !ignoreDir.test(file));
  });
  return files;
}

async function getDirsRecursive(
  targetPath: string,
  currentDir: string,
  markdownPaths: string[]
) {
  const currentPath = path.join(targetPath, currentDir);
  const files = (await readdir(path.resolve(currentPath))) || [];
  if (files.length === 0) return [];

  // Add found markdown files
  markdownPaths.push(
    ...files
      .filter((file) => markdownExt.test(file))
      .map((file) => path.join(currentDir, file))
  );

  const dirs = await asyncFilter(files, async (file: any) => {
    const absolutePath = path.resolve(currentPath, file);
    const stat = await lstat(absolutePath);
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
