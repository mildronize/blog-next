import { ISiteMetadata } from './interfaces/ISiteMetadata';

const siteMetadata: ISiteMetadata = {
  title: 'Blog. Next',
  posts: {
    directory: '_posts',
    assetsPublicPath: '/assets/posts/',
  },
  tmpPath: '.tmp',
};

export default siteMetadata;
