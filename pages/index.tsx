import Head from 'next/head';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { Container } from '@thadaw.com/components/layouts';
import PostList from '@thadaw.com/components/PostList';
import PageLayout from '@thadaw.com/components/PageLayout';
import { queryContent } from '@thadaw.com/libs/content-service';
import Hero from '@thadaw.com/components/Hero';
import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

import { siteMetadata } from '@thadaw.com/data';
import PostListByYear from '@thadaw.com/components/PostListByYear';
const { hero } = siteMetadata.components;


export default function Index({ allPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageLayout>
        <Container>
          <Hero {...hero} userLinks={siteMetadata.userLinks} />
          <h2 className="mb-8 text-md font-bold font-heading">Recent Posts</h2>
          <PostListByYear posts={allPosts} />
        </Container>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  // const allPosts = await queryContent(['title', 'date', 'slug'], {
  //   orderBy: { date: 'DESC' },
  //   // limit: 4,
  // });

  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return {
    props: { allPosts: posts },
  };
}
