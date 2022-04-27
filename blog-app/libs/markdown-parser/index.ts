// For support common js
import remark from 'remark'; // Downgrade to v13.0.0
import remarkGfm from 'remark-gfm'; // Downgrade to v1.0.0

import html from 'remark-html';
import prism from 'remark-prism';
import path from 'path';

import siteMetadata from '@thadaw.com/data/siteMetadata';
import remarkImageLink from './remark-plugins/remark-image-links';
import { getPostDirectory } from '../content-service';

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
      .use(remarkGfm)
      .use(remarkImageLink, { path: path.join(assetsPublicPath, _postDirectory) })
      // Ref: https://github.com/leerob/nextjs-prism-markdown/blob/main/lib/markdown.js
      // https://github.com/sergioramos/remark-prism/issues/265
      .use(html, { sanitize: false })
      .use(prism)
      .process(this.markdown);
    return result.toString();
  }
}
