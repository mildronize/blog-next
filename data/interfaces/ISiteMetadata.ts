export interface ISiteMetadata {
  title: string;
  theme: 'system' | 'dark' | 'light';
  posts: {
    directory: string;
    assetsPublicPath: string;
    postMetadataPath: string;
  };
  tmpPath: string;
}
