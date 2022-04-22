import { remark } from 'remark';
import html from 'remark-html';
import path from 'path';
const imageLink = require('./remarkPlugins/remarkImageLinks');

export default async function markdownToHtml(markdown: string) {
  const markdownSlug = '';
  const result = await remark()
    .use(imageLink, { path: path.join('/assets/posts/', markdownSlug) })
    .use(html)
    .process(markdown);
  return result.toString();
}
