import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import path from 'path';

import siteMetadata from '@/data/siteMetadata';
const imageLink = require('./remarkPlugins/remarkImageLinks');
import { getPostDirectory } from '../postDataProvider';

const { assetsPublicPath, contentDirectory } = siteMetadata.posts;

export interface IOption {
  relativePath?: string;
}

export default class MarkdownParser {
  markdown: string;
  options?: IOption;

  constructor(markdown: string, options: IOption) {
    this.markdown = markdown;
    this.options = options;
  }

  public async toHtml() {
    const _postDirectory = getPostDirectory(contentDirectory, this.options?.relativePath);
    const result = await remark()
      .use(imageLink, { path: path.join(assetsPublicPath, _postDirectory) })
      // Ref: https://github.com/leerob/nextjs-prism-markdown/blob/main/lib/markdown.js
      // https://github.com/sergioramos/remark-prism/issues/265
      .use(html, { sanitize: false })
      .use(prism)
      .process(this.markdown);
    return result.toString();
  }
}
