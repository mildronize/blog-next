import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Container } from '@thadaw.com/components/layouts';
import PostBody from '@thadaw.com/components/Post/PostBody';
import PostHeader from '@thadaw.com/components/Post/PostHeader';
import PageLayout from '@thadaw.com/components/PageLayout';
import { getContentBySlug, getAllContentOnlySlug } from '@thadaw.com/libs/content-service';
import MarkdownParser from '@thadaw.com/libs/markdown-parser';
import { ReturnTypeGetStaticProps } from '@thadaw.com/types';

export default function Post({ post }: ReturnTypeGetStaticProps<typeof getStaticProps>) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageLayout pageTitle={post.title}>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
           {/* tags {JSON.stringify(post.tags)} */}
            <article className="mb-32">
              <PostHeader
                title={post.title || ''}
                // coverImage={post.coverImage}
                date={post.date || ''}
                // author={post.author}
              />
              <PostBody content={post.content} />
             
            </article>
          </>
        )}
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params }: any) {
  const post = await getContentBySlug(params.slug, ['title', 'date', 'slug', 'path', 'content', 'tags']);
  const markdownParserOption = {
    relativePath: post.path,
  };

  const content = await new MarkdownParser(post.content || '', markdownParserOption).toHtml();

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllContentOnlySlug();

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
