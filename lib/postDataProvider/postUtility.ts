import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _glob from 'glob';

import siteMetadata from '@/data/siteMetadata';
import PostData from './PostData';

const glob = promisify(_glob);

const tmpPath = siteMetadata.tmpPath;
const postMetadataPath = path.join(tmpPath, '.posts.metadata.json');

export interface ISlugData {
  path: string;
  postData?: PostData;
}

export type PostMetada = Record<string, string>;

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
  postData?: PostData
) {
  // Reuse postData
  let _postData = postData;
  if (!postData) {
    // TODO: validate JSON format
    const postMetadata: PostMetada = JSON.parse(
      fs.readFileSync(postMetadataPath, 'utf8')
    );
    const contentPath = postMetadata[slug];
    const fileContent = fs.readFileSync(contentPath, 'utf8');
    _postData = new PostData(contentPath, fileContent);
  }

  if (!_postData) throw new Error(`postData should be assigned.`);

  const items: Record<string, any> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    } else if (field === 'content') {
      items[field] = _postData?.content;
    } else if (field === 'date') {
      items[field] = _postData?.date?.toISOString();
    } else if (typeof _postData?.frontmatter[field] !== 'undefined') {
      items[field] = _postData?.frontmatter[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []): Promise<any[]> {
  const slugData = await generatePostSlugMapper();
  const posts: any[] = [];
  Object.keys(slugData).forEach((slug) => {
    const data = slugData[slug];
    const post = getPostBySlug(slug, fields, data.postData);
    posts.push(post);
  });
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

async function generatePostSlugMapper() {
  const { directory } = siteMetadata.posts;
  const mdPaths = await glob(path.join(directory, '**/*.md'));
  const exportSlug: PostMetada = {};
  const slugData: Record<string, ISlugData> = {};
  for (const mdPath of mdPaths) {
    // TODO: use Async
    const fileContents = fs.readFileSync(mdPath, 'utf8');
    const postData = new PostData(mdPath, fileContents);
    const slug = postData.slug;
    exportSlug[slug] = mdPath;
    slugData[slug] = {
      path: mdPath,
      postData,
    };
  }

  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath, { recursive: true });
  }
  fs.writeFileSync(postMetadataPath, JSON.stringify(exportSlug), 'utf8');
  return slugData;
}
