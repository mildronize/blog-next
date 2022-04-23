export interface ISiteMetadata {
  title: string;
  posts: {
    directory: string;
    assetsPublicPath: string;
    postMetadataPath: string;
  };
  tmpPath: string;
}
