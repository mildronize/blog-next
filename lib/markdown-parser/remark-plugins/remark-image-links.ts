// Adapted from original: https://github.com/Pondorasti/remark-img-links

import visit from 'unist-util-visit'; // Downgrade to v2.0.3 for supporting common js 
import path from 'path';

interface IRemarkImageLinkOption {
  path: string;
}

export default function remarkImageLink(options: IRemarkImageLinkOption) {
  return (tree: any) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      'image',
      (node: any) => {
        // Sanitize URL by removing leading `/`
        const relativeUrl = node.url.replace(/^\//, '');
        node.url = path.join(options.path, relativeUrl);
      }
    );
  };
}
