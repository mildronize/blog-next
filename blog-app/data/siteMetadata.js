// @ts-check

/**
 * @type {import('./interfaces/ISiteMetadata').ISiteMetadata}
 */

// TODO: Check path is valid before start app

const siteMetadata = {
  title: 'Thada W.',
  theme: 'system',
  posts: {
    contentDirectory: '../contents',
    postDirectory: '../contents/posts',
    assetsPublicPath: '/',
    postMetadataPath: '.posts.metadata.json'
  },
  tmpPath: '.tmp',
  components: {
    hero: {
      title: `Hi 👋 I\'m Thada, DevSecOps Engineer, welcome to my blog. `,
      tagline: `Sharing ideas, programming techniques, web technology and others.`,
    }
  }
};

module.exports =  siteMetadata;
