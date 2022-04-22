import { remark } from 'remark';
import html from 'remark-html';
import path from 'path';
const imageLink = require('./remarkPlugins/remarkImageLinks');

export default class MarkdownParser {
  markdown: string;

  constructor(markdown: string) {
    this.markdown = markdown;
  }

  public async toHtml() {
    const markdownSlug = '';
    const result = await remark()
      .use(imageLink, { path: path.join('/assets/posts/', markdownSlug) })
      .use(html)
      .process(this.markdown);
    return result.toString();
  }
}
