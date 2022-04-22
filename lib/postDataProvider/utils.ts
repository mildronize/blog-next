import * as date from 'date-fns';

/**
 * Returns a string that resolve actual filename
 * Ex.
 *  content path = _posts/preview/title-article/test.md
 *  the result = title-article (not `test`)
 *
 *  If structure markdown files as a directory
 *  ```
 *    ./2015-05-07-responsive-expanding-search-bar
 *     └── readme.md (any file, use info from parent)
 *  ```
 *
 * @param {string} prefixPath - prefix of path which exclude from result.
 * @param {string} contentPath - A number of milliseconds to delay resolution of the Promise.
 * @returns {string}
 */

export function getActualFilename(prefixPath: string, contentPath: string) {
  const parsedPrefixPath = prefixPath.replace(/^\/*/, '');
  const removedExtensionPath = contentPath.split('.')[0];
  const parsedPath = removedExtensionPath.replace(
    new RegExp(`${parsedPrefixPath}/*`),
    ''
  );
  const split = parsedPath.split('/');
  if (split.length >= 2) return split[split.length - 2];
  return parsedPath;
}

export function extractDate(filename: string): Date | undefined {
  checkValidFilename(filename);
  const nodeDate = filename.split('-').slice(0, 3).join('-');
  const postDate = new Date(nodeDate);
  if (!date.isValid(postDate)) return undefined;
  return postDate;
}

export function extractFilenameSlug(filename: string): string {
  checkValidFilename(filename);
  const filenameRegex = /^(\d\d\d\d-\d\d-\d\d)-([\w-]+)$/;
  if (filenameRegex.test(filename)) {
    const matchResult = filename.match(filenameRegex);
    if (matchResult && matchResult?.length >= 2) {
      return matchResult[2];
    }
  }
  return filename;
}

function checkValidFilename(filename: string) {
  if (filename.search('/') > 0) {
    throw new Error(
      `Unexpected char '/', Invalid filename please call "getActualFilename" first`
    );
  }
}
