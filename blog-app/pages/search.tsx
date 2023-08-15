// Ref from https://github.com/satnaing/astro-paper

import Card from '@thadaw.com/components/Card';
import Fuse from 'fuse.js';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Container } from '../components/layouts/Container';
import PageLayout from '@thadaw.com/components/PageLayout';
import { queryContent } from '@thadaw.com/libs/content-service';
import { ReturnTypeGetStaticProps } from '@thadaw.com/types';

interface SearchResult {
  item: ReturnTypeGetStaticProps<typeof getStaticProps>['searchList'][number];
  refIndex: number;
}

export default function SearchBar({ searchList }: ReturnTypeGetStaticProps<typeof getStaticProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ['title', 'tags'],
        // keys: ['title', 'description', 'tags'],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
        useExtendedSearch: true,
      }),
    [searchList]
  );

  useEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get('q');
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd = searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    // Add search result only if
    // input value is more than one character
    let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('q', inputVal);
      const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      history.replaceState(null, '', newRelativePathQuery);
    } else {
      history.replaceState(null, '', window.location.pathname);
    }
  }, [inputVal]);

  return (
    <>
      <PageLayout pageTitle="Search">
        <Container>
          <label className="">
            <input
              className="w-full rounded-lg border border-skin-fill 
              border-opacity-40  py-3 pl-10 bg-slate-100 dark:bg-slate-500
              pr-3 placeholder:italic 
              focus:border-skin-accent focus:outline-none"
              placeholder="Search for anything..."
              type="text"
              name="search"
              value={inputVal}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
              ref={inputRef}
            />
          </label>

          {inputVal.length > 1 && (
            <div className="mt-8">
              Found {searchResults?.length}
              {searchResults?.length && searchResults?.length === 1 ? ' result' : ' results'} for '{inputVal}'
            </div>
          )}

          <ul>
            {searchResults &&
              searchResults.map(({ item, refIndex }) => (
                <Card href={`/posts/${item.slug}`} frontmatter={item} key={`${refIndex}-${item.slug}`} />
              ))}
          </ul>
        </Container>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await queryContent(['title', 'date', 'slug', 'tags'], {
    orderBy: { date: 'DESC' },
  });
  return {
    props: {
      searchList: allPosts
    },
  };
}
