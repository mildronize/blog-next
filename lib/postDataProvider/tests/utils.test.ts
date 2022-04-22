import { generateSlug } from '@/lib/postDataProvider/utils';

describe('generateSlug', () => {
  const cases = [
    ['_posts', '_posts/preview.md', 'preview'],
    // ['_posts', '_posts/preview/test.md', 'preview'],
  ];

  test.each(cases)(
    `generateSlug(%s,%s) should be %s`,
    (prefixPath, contentPath, expected) => {
      expect(generateSlug(prefixPath, contentPath)).toEqual(expected);
    }
  );
});
