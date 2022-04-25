import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _glob from 'glob';

import siteMetadata from '@/data/siteMetadata';
import PostData from './PostData';
import generatePostMetadata from './generatePostMetadata';

const glob = promisify(_glob);
const defaultUnicode = 'utf8';

const tmpPath = siteMetadata.tmpPath;
const postMetadataPath = path.join(tmpPath, siteMetadata.posts.postMetadataPath);

export interface IPostMetadata {
  path: string;
  uuid?: string;
  postData?: PostData;
}

export type PostMetadataMap = Record<string, IPostMetadata>;

// export type PostMetadata = Record<string, string>;

export async function getPostBySlug(slug: string, fields: string[] = [], postData?: PostData) {
  // Reuse postData
  let _postData = postData;
  if (!postData) {
    // TODO: validate JSON format
    const postMetadataMap: PostMetadataMap = JSON.parse(fs.readFileSync(postMetadataPath, defaultUnicode));
    const contentPath = postMetadataMap[slug].path;
    const fileContent = fs.readFileSync(contentPath, defaultUnicode);
    _postData = new PostData(contentPath, fileContent);
  }

  if (!_postData) throw new Error(`postData should be assigned.`);
  // inject uuid if no uuid
  await _postData.injectUUID();

  const items: Record<string, any> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = slug;
    } else if (field === 'content') {
      items[field] = _postData?.content;
    } else if (field === 'date') {
      // error - Error: Error serializing `.allPosts[5].date` returned from `getStaticProps` in "/".
      // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
      // JSON cannot be undefined !!
      items[field] = _postData?.date ? _postData?.date?.toISOString() : null;
    } else if (field === 'path') {
      items[field] = _postData?.path;
    } else if (typeof _postData?.frontmatter[field] !== 'undefined') {
      items[field] = _postData?.frontmatter[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []): Promise<any[]> {
  const slugData = await generatePostMetadata();
  const posts: any[] = [];

  for (const slug of Object.keys(slugData)) {
    const data = slugData[slug];
    // TODO: Make it non-blocking IO
    const post = await getPostBySlug(slug, fields, data.postData);
    posts.push(post);
  }

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export async function getAllMarkdownPaths() {
  return glob(path.join(siteMetadata.posts.postDirectory, '**/*.md'));
}

async function generatePostSlugMapper() {
  const mdPaths = await getAllMarkdownPaths();
  let postMetadataMap: PostMetadataMap = {};
  try {
    // Make dev mode work when the slug name is changed
    // Load the old slug.
    postMetadataMap = JSON.parse(fs.readFileSync(postMetadataPath, defaultUnicode));
  } catch (e) {
    console.warn(`No exisitng "${postMetadataPath}" file.`);
  }
  for (const mdPath of mdPaths) {
    // TODO: use Async
    const fileContents = fs.readFileSync(mdPath, defaultUnicode);
    const postData = new PostData(mdPath, fileContents);
    const slug = postData.slug;
    postMetadataMap[slug] = {
      path: mdPath,
      postData,
    };
  }

  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath, { recursive: true });
  }

  const minifiedPostMetadataMap: PostMetadataMap = {};
  for (const [slug, postMetadata] of Object.entries(postMetadataMap)) {
    minifiedPostMetadataMap[slug] = {
      path: postMetadata.path,
    };
  }
  fs.writeFileSync(postMetadataPath, JSON.stringify(minifiedPostMetadataMap, null, 2), defaultUnicode);
  return postMetadataMap;
}
