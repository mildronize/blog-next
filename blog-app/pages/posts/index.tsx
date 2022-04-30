import { Container } from '@thadaw.com/components/layouts';
import PostList from '@thadaw.com/components/PostList';
import PageLayout from '@thadaw.com/components/PageLayout';
import { getAllPosts } from '@thadaw.com/libs/content-service';

import { siteMetadata } from '@thadaw.com/data';
const { hero } = siteMetadata.components;

interface IIndexProps {
  allPosts: any[];
}

export default function Index({ allPosts }: IIndexProps) {
  return (
    <>
      <PageLayout>
        <Container>
          <PostList posts={allPosts} />
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
