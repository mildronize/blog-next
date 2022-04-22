import { remark } from 'remark';
import html from 'remark-html';
import path from 'path';

import siteMetadata from '@/data/siteMetadata';
const imageLink = require('./remarkPlugins/remarkImageLinks');

const { assetsPublicPath } = siteMetadata.posts;

export default class MarkdownParser {
  markdown: string;

  constructor(markdown: string) {
    this.markdown = markdown;
  }

  public async toHtml() {
    const markdownSlug = '';
    const result = await remark()
      .use(imageLink, { path: path.join(assetsPublicPath, markdownSlug) })
      .use(html)
      .process(this.markdown);
    return result.toString();
  }
}
