import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import _glob from 'glob';

import siteMetadata from '@thadaw.com/data/siteMetadata';
import PostData from './PostData';
import { PostMetadataMap, getAllMarkdownPaths } from './postUtility';

const glob = promisify(_glob);
const defaultUnicode = 'utf8';

const tmpPath = siteMetadata.tmpPath;
const postMetadataPath = path.join(tmpPath, '.posts.metadata.json');

async function generatePostMetadata() {
  const mdPaths = await getAllMarkdownPaths();
  let postMetadataMap: PostMetadataMap = {};
  try {
    // Make dev mode work when the slug name is changed
    // Load the old slug.
    postMetadataMap = JSON.parse(fs.readFileSync(postMetadataPath, defaultUnicode));
  } catch (e) {
    console.debug(`No exisitng "${postMetadataPath}" file.`);
  }
  for (const mdPath of mdPaths) {
    // TODO: use Async
    const fileContents = fs.readFileSync(mdPath, defaultUnicode);
    const postData = new PostData(mdPath, fileContents);
    const slug = postData.slug;
    postMetadataMap[slug] = {
      path: mdPath,
      postData,
      uuid: postData.frontmatter.uuid || '',
    };
  }

  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath, { recursive: true });
  }

  const minifiedPostMetadataMap: PostMetadataMap = {};
  for (const [slug, postMetadata] of Object.entries(postMetadataMap)) {
    minifiedPostMetadataMap[slug] = {
      path: postMetadata.path,
      uuid: postMetadata.uuid,
    };
  }
  fs.writeFileSync(postMetadataPath, JSON.stringify(minifiedPostMetadataMap, null, 2), defaultUnicode);
  console.debug(`Writing... "${postMetadataPath}" file.`);
  return postMetadataMap;
}

export default generatePostMetadata;
