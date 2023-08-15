import { queryContent } from '@thadaw.com/libs/content-service';
import { ReturnTypeGetStaticProps } from '@thadaw.com/types';
import { useEffect } from 'react';

function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '');
}

function findRenderedPathname(
  pathname: string,
  posts: {
    uuid?: string;
    slug?: string;
  }[]
): string {
  console.log('pathname', pathname, pathname.replace('/s/', ''));
  console.log('posts', posts);
  const post = posts.find(post => post.uuid === removeTrailingSlash(pathname.replace('/s/', '')));
  if (post) {
    return `/posts/${post.slug}` || '';
  }
  return '';
}

export default function Post({ posts }: ReturnTypeGetStaticProps<typeof getStaticProps>) {
  useEffect(() => {
    if (window) {
      const targetUrl = findRenderedPathname(window.location.pathname, posts);
      console.log('targetUrl', targetUrl);
      window.location.replace(targetUrl);
    }
  }, []);

  return <>Loading ...</>;
}

export async function getStaticProps({ params }: any) {
  const allPosts = await queryContent(['uuid', 'slug']);

  return {
    props: {
      posts: allPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = await queryContent(['uuid']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.uuid,
        },
      };
    }),
    fallback: false,
  };
}
