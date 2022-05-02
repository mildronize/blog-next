import matter from 'gray-matter';
import fs from 'fs/promises';
import { getActualFilename, extractDate, extractFilenameSlug } from './pathUtility';
import { retryNewUuid, getUuidStore, generateUUID } from './Uuid';
import { getAllMarkdownPaths } from './postUtility';
import siteMetadata from '@thadaw.com/data/siteMetadata';
import _ from 'lodash';
const { posts } = siteMetadata;

/**
 *  Data which export to API should be Serializable to JSON passing following Next.js function:
 *  getStaticProps, getServerSideProps, or getInitialProps
 */

 export interface IPostSerializableJSON {
  slug?: string;
  /**
   * Date should be string
   */
  date?: string | null;
  title?: string;
  path?: string;
  content?: string;
}

// export type Frontmatter = Record<string, any>;
export interface IFrontmatter {
  title?: string;
  uuid?: string;
}

export interface IField {
  slug: string;
  date: Date | null;
  path: string;
  filenameSlug: string;
}

const defaultUnicode = 'utf8';

export default class PostData {
  public frontmatter: IFrontmatter;
  public field: IField;
  public content: string;

  constructor(relativePath: string, markdown: string) {
    const { data, content } = matter(markdown);
    const filename = getActualFilename(posts.postDirectory, relativePath);
    // TODO: Validate object when load from string
    this.frontmatter = this.importFrontmatter(data);
    this.content = content;
    this.field = {
      slug: this.generateSlug(),
      date: extractDate(filename),
      path: relativePath,
      filenameSlug: extractFilenameSlug(filename),
    };
  }

  private importFrontmatter(data: Record<string, any>) {
    const result: IFrontmatter = {
      title: data.title,
      uuid: data.uuid,
    };
    return result;
  }

  private generateSlug() {
    // Frontmatter title or filename slug
    const readableSlug = _.kebabCase(this.frontmatter.title || this.field.filenameSlug);
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
      await fs.writeFile(this.field.path, matter.stringify(this.content, this.frontmatter), defaultUnicode);
    }
  } 

  /**
   * @returns Export to Serializable JSON which supported by Next.js API
   */

  public toJSON(): IPostSerializableJSON {
    return {
      title: this.frontmatter.title,
      date: this.field.date?.toISOString() || null,
      slug: this.field.slug,
      path: this.field.path,
      content: this.content,
    };
  }
}
