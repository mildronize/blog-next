// @ts-check

/**
 * @type {import('./interfaces/ISiteMetadata').ISiteMetadata}
 */

const siteMetadata = {
  title: 'Blog. Next',
  theme: 'system',
  posts: {
    directory: '_posts',
    assetsPublicPath: '/',
    postMetadataPath: '.posts.metadata.json'
  },
  tmpPath: '.tmp'
};

module.exports =  siteMetadata;
