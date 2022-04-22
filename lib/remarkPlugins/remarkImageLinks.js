// Adapted from original: https://github.com/Pondorasti/remark-img-links
// Using v1.4.0 because need common js version
const visit = require('unist-util-visit');
const path = require('path');

module.exports = function (options) {
  function visitor(node) {
    // Sanitize URL by removing leading `/`
    const relativeUrl = node.url.replace(/^\//, '');

    node.url = path.join(options.path, relativeUrl);
  }

  function transform(tree) {
    if (options && options.path) {
      visit(tree, 'image', visitor);
    } else {
      throw Error('Missing required `absolutePath` option.');
    }
  }

  return transform;
};
