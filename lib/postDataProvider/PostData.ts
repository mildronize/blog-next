import matter from 'gray-matter';
import {
  getActualFilename,
  extractDate,
  extractFilenameSlug,
} from './pathUtility';
import siteMetadata from '@/data/siteMetadata';
import _ from 'lodash';
const { posts } = siteMetadata;

export interface IFrontmatter {
  title: string;
  date: Date;
  tags?: string[];
}

export default class PostData {
  public frontmatter: any;
  public content: string;
  public date?: Date;
  public filenameSlug: string;
  public slug: string;

  constructor(relativePath: string, markdown: string) {
    const { data, content } = matter(markdown);
    const filename = getActualFilename(posts.directory, relativePath);
    this.date = extractDate(filename);
    this.filenameSlug = extractFilenameSlug(filename);
    this.slug = _.kebabCase(data.title);
    this.frontmatter = data as IFrontmatter;
    this.content = content;
  }
}
