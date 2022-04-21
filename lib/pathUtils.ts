// Ref: https://github.com/mildronize/mildronize.github.io/blob/main/scripts/utils.ts

import fs from 'fs/promises';
import path from 'path';

// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
export const asyncFilter = async (arr: any, predicate: any) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v: any, index: any) => results[index]);
};

async function getDirsRecursive(
  regex: RegExp,
  targetPath: string,
  currentDir: string,
  paths: string[]
) {
  const currentPath = path.join(targetPath, currentDir);
  const files = (await fs.readdir(path.resolve(currentPath))) || [];
  if (files.length === 0) return [];

  // Add found all files which matches with Regex
  paths.push(
    ...files
      .filter((file) => regex.test(file))
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
      regex,
      targetPath,
      path.join(currentDir, dir),
      paths
    );
  }

  return paths;
}

export async function getAllNestedPaths(targetPath: string, regex: RegExp) {
  try {
    return await getDirsRecursive(regex, targetPath, '', []);
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
  }
  return [];
}
