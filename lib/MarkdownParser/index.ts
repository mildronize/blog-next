import { remark } from 'remark';
import html from 'remark-html';
import path from 'path';

import siteMetadata from '@/data/siteMetadata';
const imageLink = require('./remarkPlugins/remarkImageLinks');
import { getPostDirectory } from '../postDataProvider';

const { assetsPublicPath, directory } = siteMetadata.posts;

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
    const postDirectory = getPostDirectory(directory, this.options?.relativePath);
    console.log('postDirectory', this.options?.relativePath);
    const result = await remark()
      .use(imageLink, { path: path.join(assetsPublicPath, postDirectory) })
      .use(html)
      .process(this.markdown);
    return result.toString();
  }
}
