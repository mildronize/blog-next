import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Container } from '@thadaw.com/components/layouts';
import PostBody from '@thadaw.com/components/Post/post-body';
import PostHeader from '@thadaw.com/components/Post/post-header';
import PageLayout from '@thadaw.com/components/PageLayout';
import { getPostBySlug, getAllPosts } from '@thadaw.com/libs/content-service';
import MarkdownParser from '@thadaw.com/libs/markdown-parser';
import { siteMetadata } from '@thadaw.com/data';

interface IPostProps {
  post: any;
}

export default function Post({ post }: IPostProps) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageLayout defaultTitle={siteMetadata.title} pageTitle={post.title}>
      <Container>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader
                title={post.title}
                // coverImage={post.coverImage}
                date={post.date}
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
  const post = await getPostBySlug(params.slug, ['title', 'date', 'slug', 'path', 'content']);

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
  const posts = await getAllPosts(['slug']);

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
