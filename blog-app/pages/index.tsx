import Head from 'next/head';
import { Container } from '@thadaw.com/components/layouts';
import PostList from '@thadaw.com/components/PostList';
import PageLayout from '@thadaw.com/components/PageLayout';
import { queryContent } from '@thadaw.com/libs/content-service';
import Hero from '@thadaw.com/components/Hero';

import { siteMetadata } from '@thadaw.com/data';
import PostListByYear from '@thadaw.com/components/PostListByYear';
const { hero } = siteMetadata.components;

interface IIndexProps {
  allPosts: any[];
}

export default function Index({ allPosts }: IIndexProps) {
  return (
    <>
      <PageLayout>
        <Container>
          <Hero {...hero} userLinks={siteMetadata.userLinks} />
          <h2 className="mb-8 text-md font-bold font-heading">
            Recent Posts
          </h2>
          <PostListByYear posts={allPosts} />
        </Container>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await queryContent(['title', 'date', 'slug'], {
    orderBy: { date: 'DESC' },
    // limit: 4,
  });
  return {
    props: { allPosts },
  };
}
