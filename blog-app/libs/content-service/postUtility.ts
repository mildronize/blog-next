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

function getPostData(postMetadataPath: string, slug: string) {
  // TODO: validate JSON format
  const postMetadataMap: PostMetadataMap = JSON.parse(fs.readFileSync(postMetadataPath, defaultUnicode));
  const contentPath = postMetadataMap[slug].path;
  const fileContent = fs.readFileSync(contentPath, defaultUnicode);
  return new PostData(contentPath, fileContent);
}

export async function getContentBySlug(
  slug: string,
  fields: (keyof IPostSerializableJSON)[] = [],
  postData?: PostData
) {
  // Reuse postData
  const _postData = postData ? postData : getPostData(postMetadataPath, slug);
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

type OrderBy = 'ASC' | 'DESC';
type Where = {
  slug?: string;
  // tag?: string;
  // categroy: string;
};

interface IQueryContentOption {
  offset?: number;
  limit?: number;
  orderBy?: { date: OrderBy };
  where?: Where;
}

export async function getAllContents(fields: (keyof IPostSerializableJSON)[] = []) {
  const slugData = await generatePostMetadata();
  const posts: FilterRecord<IPostSerializableJSON, keyof IPostSerializableJSON>[] = [];

  for (const slug of Object.keys(slugData)) {
    const data = slugData[slug];
    // TODO: Make it non-blocking IO
    const post = await getContentBySlug(slug, fields, data.postData);
    posts.push(post);
  }
  return posts;
}


export async function queryContent(fields: (keyof IPostSerializableJSON)[] = [], options?: IQueryContentOption) {
  let posts = await getAllContents(fields);
  if (!options) return posts;
  // 1: WHERE
  if (options?.where) {
    posts = whereContent(posts, fields, options.where);
  }
  // 2: ORDER
  if (options?.orderBy?.date) {
    posts = orderContentByDate(posts, fields, options.orderBy?.date);
  }
  // 3: LIMIT
  if (options?.limit) {
    const offset = options?.offset ? options?.offset : 0;
    posts = posts.slice(offset, options?.limit + offset);
  }
  return posts;
}

function whereContent(
  posts: FilterRecord<IPostSerializableJSON, keyof IPostSerializableJSON>[],
  fields: (keyof IPostSerializableJSON)[] = [],
  where: Where
) {
  if (fields.indexOf('slug') < 0) throw new Error('Slug is requre for using where option');
  return posts.filter(post => {
    if (post.slug === where?.slug) {
      return post;
    }
  });
}

function orderContentByDate(
  posts: FilterRecord<IPostSerializableJSON, keyof IPostSerializableJSON>[],
  fields: (keyof IPostSerializableJSON)[] = [],
  orderBy: OrderBy
) {
  if (fields.indexOf('date') < 0) throw new Error('Using sorting by date is requried field date');
  const sortCondition: Record<OrderBy, { true: number; false: number }> = {
    ASC: { true: 1, false: -1 },
    DESC: { true: -1, false: 1 },
  };
  return posts.sort((post1, post2) =>
    post1.date && post2.date
      ? post1.date > post2.date
        ? sortCondition[orderBy].true
        : sortCondition[orderBy].false
      : 1
  );
}

export async function getAllMarkdownPaths() {
  return glob(path.join(siteMetadata.posts.postDirectory, '**/*.md'));
}
