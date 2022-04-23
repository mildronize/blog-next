import matter from 'gray-matter';
import { getActualFilename, extractDate, extractFilenameSlug } from './pathUtility';
import siteMetadata from '@/data/siteMetadata';
import _ from 'lodash';
const { posts } = siteMetadata;

export type Frontmatter = Record<string, any>;

export default class PostData {
  public frontmatter: Frontmatter;
  public content: string;
  public date?: Date;
  public filenameSlug: string;
  public slug: string;
  public path: string;

  constructor(relativePath: string, markdown: string) {
    const { data, content } = matter(markdown);
    this.path = relativePath;
    const filename = getActualFilename(posts.directory, relativePath);
    this.date = extractDate(filename);
    this.filenameSlug = extractFilenameSlug(filename);
    this.slug = _.kebabCase(data.title);
    // TODO: Validate object when load from string
    this.frontmatter = data as Frontmatter;
    this.content = content;
  }
}
