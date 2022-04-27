// @ts-check

/**
 * @type {import('./interfaces/ISiteMetadata').ISiteMetadata}
 */

const siteMetadata = {
  title: 'Blog. Next',
  theme: 'system',
  posts: {
    contentDirectory: '../_contents',
    postDirectory: '../_contents/posts',
    assetsPublicPath: '/',
    postMetadataPath: '.posts.metadata.json'
  },
  tmpPath: '.tmp'
};

module.exports =  siteMetadata;
