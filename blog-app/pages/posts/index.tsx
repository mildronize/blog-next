import { Container } from '@thadaw.com/components/layouts';
import PostListByYear from '@thadaw.com/components/PostListByYear';
import PageLayout from '@thadaw.com/components/PageLayout';
import { queryContent } from '@thadaw.com/libs/content-service';

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
          <PostListByYear posts={allPosts} />
        </Container>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = await queryContent(['title', 'date', 'slug'], {
    orderBy: { date: 'DESC' },
  });


  // allPosts[0].
  // const yearSet = new Set();
  // let yearGroup = [];
  // allPosts.forEach(post => {
  //   post.
  // });

  return {
    props: { allPosts },
  };
}
