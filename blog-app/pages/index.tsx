import Head from 'next/head';
import { Container } from '@thadaw.com/components/layouts';
import MoreStories from '@thadaw.com/components/MoreStories';
import PageLayout from '@thadaw.com/components/PageLayout';
import { getAllPosts } from '@thadaw.com/libs/content-service';
import Hero from '@thadaw.com/components/Hero';

import { siteMetadata } from '@thadaw.com/data';
const { hero } = siteMetadata.components;

interface IIndexProps {
  allPosts: any[];
}

export default function Index({ allPosts }: IIndexProps) {
  return (
    <>
      <PageLayout defaultTitle={siteMetadata.title}>
        <Container>
          <Hero {...hero} />
          <MoreStories posts={allPosts} />
        </Container>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts(['title', 'date', 'slug']);

  return {
    props: { allPosts },
  };
}
