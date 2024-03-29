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
      title: `Hi 👋 I\'m Thada, DevOps & SRE Lead, welcome to my blog. `,
      tagline: `TypeScript, Azure, Creator of Nammatham, Serverless.`,
    },
    footer: {
      sinceYear: 2015,
      copyright: 'thadaw.com',
      tagline: '<a href="https://github.com/mildronize/blog-next" target="_blank">v6.0.0</a> Built with ❤️ by Thada Wangthammang'
    },
  },
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/mildronize',
      iconClassName: 'fab fa-github',
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/mildronize/',
      iconClassName: 'fab fa-facebook',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/mildronize',
      iconClassName: 'fab fa-twitter',
    },
    {
      label: 'Email',
      url: 'mailto:thada.wth@gmail.com',
      iconClassName: 'fas fa-envelope',
    },
    {
      label: 'Linkedin',
      url: 'https://www.linkedin.com/in/thada-wangthammang-281894a6/',
      iconClassName: 'fab fa-linkedin',
    },
    {
      label: 'Medium',
      url: 'https://thadaw.medium.com/',
      iconClassName: 'fab fa-medium',
    },
    {
      label: 'RSS',
      url: '/rss',
      iconClassName: 'fas fa-rss',
    },
  ],
};

module.exports = siteMetadata;
