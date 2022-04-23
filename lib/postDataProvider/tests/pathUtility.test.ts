import {
  getActualFilename,
  extractDate,
  extractFilenameSlug,
} from '@/lib/postDataProvider/pathUtility';

describe('getActualFilename', () => {
  const cases = [
    ['_posts', '_posts/preview.md', 'preview'],
    ['_posts', '_posts/preview/test.md', 'preview'],
    ['_posts', '_posts/preview/title-article/test.md', 'title-article'],
    ['_posts', '_posts/preview.mdx', 'preview'],
    ['_posts', '_posts/preview', 'preview'],
    ['/_posts', '_posts/preview', 'preview'],
    ['//_posts', '_posts/preview', 'preview'],
    ['_posts/', '_posts/preview', 'preview'],
    ['/_posts/', '_posts/preview', 'preview'],
    ['_posts', 'preview.md', 'preview'],
    // With Date
    ['_posts', '_posts/2022-04-22-preview.md', '2022-04-22-preview'],
  ];

  test.each(cases)(
    `getActualFilename(%s,%s) should be %s`,
    (prefixPath, contentPath, expected) => {
      expect(getActualFilename(prefixPath, contentPath)).toEqual(expected);
    }
  );
});

describe('extractDate', () => {
  type Case = {
    filename: string;
    expected?: Date;
  };
  const cases: Case[] = [
    { filename: 'preview', expected: undefined },
    { filename: '2022-04-22', expected: new Date('2022-04-22') },
    { filename: '2022-04-22-22', expected: new Date('2022-04-22') },
    { filename: '2022-04-222', expected: undefined },
  ];

  test.each(cases)(`extractDate(%s) should be %p`, ({ filename, expected }) => {
    expect(extractDate(filename)).toEqual(expected);
  });

  test('Check throw error', () => {
    expect(() => extractDate('_posts/preview')).toThrow(
      `Unexpected char '/', Invalid filename please call "getActualFilename" first`
    );
  });
});

describe('extractFilenameSlug', () => {
  type Case = {
    filename: string;
    expected: string;
  };

  const cases: Case[] = [
    { filename: 'preview', expected: 'preview' },
    { filename: '2022-04-22-preview', expected: 'preview' },
    // If invalid date, return original name
    { filename: '2022-04-2-preview-111', expected: '2022-04-2-preview-111' },
  ];

  test.each(cases)(
    `extractFilenameSlug(%s) should be %s`,
    ({ filename, expected }) => {
      expect(extractFilenameSlug(filename)).toEqual(expected);
    }
  );

  test('Check throw error', () => {
    expect(() => extractFilenameSlug('_posts/preview')).toThrow(
      `Unexpected char '/', Invalid filename please call "getActualFilename" first`
    );
  });
});