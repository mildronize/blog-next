import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _glob from 'glob';

import siteMetadata from '@thadaw.com/data/siteMetadata';
import PostData from './PostData';
import generatePostMetadata from './generatePostMetadata';
import { filterRecord, FilterRecord } from './utility';

const glob = promisify(_glob);
const defaultUnicode = 'utf8';

const tmpPath = siteMetadata.tmpPath;
const postMetadataPath = path.join(tmpPath, siteMetadata.posts.postMetadataPath);

export interface IPostMetadata {
  path: string;
  uuid?: string;
  postData?: PostData;
}

/**
 *  Data which export to API should be Serializable to JSON passing following Next.js function:
 *  getStaticProps, getServerSideProps, or getInitialProps
 */

export interface IPostSerializableJSON {
  slug?: string;
  date?: string | null;
  title?: string;
  path?: string;
  content?: string;
}

export type PostMetadataMap = Record<string, IPostMetadata>;

function getPostData(postMetadataPath: string, slug: string){
  // TODO: validate JSON format
  const postMetadataMap: PostMetadataMap = JSON.parse(fs.readFileSync(postMetadataPath, defaultUnicode));
  const contentPath = postMetadataMap[slug].path;
  const fileContent = fs.readFileSync(contentPath, defaultUnicode);
  return new PostData(contentPath, fileContent);
}

export async function getPostBySlug(slug: string, fields: (keyof IPostSerializableJSON)[] = [], postData?: PostData) {
  // Reuse postData
  const _postData = postData? postData: getPostData(postMetadataPath, slug);
  if (!_postData) throw new Error(`postData should be assigned.`);

  // inject uuid if no uuid
  await _postData.injectUUID();

  // Load PostData to Serializable JSON which supported by Next.js API
  const postSerializableJSON: IPostSerializableJSON = {
    title: _postData.frontmatter.title,
    date: _postData.field.date?.toISOString() || null,
    slug: _postData.field.slug,
    path: _postData.field.path,
    content: _postData.content,
  };

  // Ensure only the minimal needed data is exposed
  // https://nextjs.org/docs/messages/large-page-data
  return filterRecord(postSerializableJSON, fields);
}

export async function getAllPosts(fields: (keyof IPostSerializableJSON)[] = []) {
  const slugData = await generatePostMetadata();
  const posts: FilterRecord<IPostSerializableJSON, keyof IPostSerializableJSON>[] = [];

  for (const slug of Object.keys(slugData)) {
    const data = slugData[slug];
    // TODO: Make it non-blocking IO
    const post = await getPostBySlug(slug, fields, data.postData);
    posts.push(post);
  }
  const sortedPosts = posts.sort((post1, post2) => (post1.date && post2.date ? (post1.date > post2.date ? -1 : 1) : 1));
  return sortedPosts;
}

export async function getAllMarkdownPaths() {
  return glob(path.join(siteMetadata.posts.postDirectory, '**/*.md'));
}
