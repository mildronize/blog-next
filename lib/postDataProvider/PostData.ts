import matter from 'gray-matter';
import fs from 'fs/promises';
import { getActualFilename, extractDate, extractFilenameSlug } from './pathUtility';
import { retryNewUuid, getUuidStore, generateUUID } from './Uuid';
import { getAllMarkdownPaths } from './postUtility';
import siteMetadata from '@/data/siteMetadata';
import _ from 'lodash';
const { posts } = siteMetadata;

export type Frontmatter = Record<string, any>;
const defaultUnicode = 'utf8';

export default class PostData {
  public frontmatter: Frontmatter;
  public content: string;
  public date: Date | null;
  public filenameSlug: string;
  public slug: string;
  public path: string;

  constructor(relativePath: string, markdown: string) {
    const { data, content } = matter(markdown);
    this.path = relativePath;
    const filename = getActualFilename(posts.postDirectory, relativePath);
    this.date = extractDate(filename);
    this.filenameSlug = extractFilenameSlug(filename);
    // TODO: Validate object when load from string
    this.frontmatter = data as Frontmatter;
    this.content = content;
    this.slug = this.generateSlug();
  }

  private generateSlug() {
    // Frontmatter title or filename slug
    const readableSlug = _.kebabCase(this.frontmatter.title || this.filenameSlug);
    let uuid;
    if (!('uuid' in this.frontmatter)) {
      // create tmp UUID
      uuid = generateUUID(7);
    } else {
      uuid = this.frontmatter.uuid;
    }
    return `${readableSlug}-${uuid}`;
  }

  public async injectUUID() {
    let uuid = '';
    if (!('uuid' in this.frontmatter)) {
      const markdownPaths = await getAllMarkdownPaths();
      console.log(markdownPaths);
      const { uuidStore } = await getUuidStore(markdownPaths);
      uuid = retryNewUuid(uuidStore);
      this.frontmatter.uuid = uuid;
      await fs.writeFile(this.path, matter.stringify(this.content, this.frontmatter), defaultUnicode);
    }
  }
}
