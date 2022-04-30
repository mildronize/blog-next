import Head from 'next/head';
import { Container } from '@thadaw.com/components/layouts';
import PostList from '@thadaw.com/components/PostList';
import PageLayout from '@thadaw.com/components/PageLayout';
import { getAllPosts } from '@thadaw.com/libs/content-service';
import Hero from '@thadaw.com/components/Hero';

import { siteMetadata } from '@thadaw.com/data';
const { hero } = siteMetadata.components;

interface IIndexProps {
  allPosts: any[];
}

export default function Index({ allPosts }: IIndexProps) {
  const recentPosts = allPosts.slice(0, 4);
  return (
    <>
      <PageLayout>
        <Container>
          <Hero {...hero} userLinks={siteMetadata.userLinks} />
          <PostList posts={recentPosts} />
        </Container>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts(['title', 'date', 'slug']);
  // console.log(allPosts)

  return {
    props: { allPosts },
  };
}
