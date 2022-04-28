export interface ISiteMetadata {
  title: string;
  /**
   Default theme when web loaded
   */
  theme: 'system' | 'dark' | 'light';
  posts: {
    /** the root of content directory, it can contains various type of contents e.g. 
    posts, pages */
    contentDirectory: string;
    postDirectory: string;
    assetsPublicPath: string;
    postMetadataPath: string;
  };
  tmpPath: string;
  components: {
    hero: IHero;
  };
}

export interface IHero {
  title: string;
  tagline: string;
}
