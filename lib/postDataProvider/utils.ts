export function generateSlug(prefixPath: string, contentPath: string) {
  const markdownExt = /\.md$/;
  return contentPath
    .replace(new RegExp(`${prefixPath}/*`), '')
    .replace(markdownExt, '');
}
