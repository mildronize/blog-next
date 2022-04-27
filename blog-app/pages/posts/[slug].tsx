import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Container from '@thadaw.com/components/Container';
import PostBody from '@thadaw.com/components/post-body';
import PostHeader from '@thadaw.com/components/post-header';
import Layout from '@thadaw.com/components/layout';
import { getPostBySlug, getAllPosts } from '@thadaw.com/libs/content-service';
import MarkdownParser from '@thadaw.com/libs/markdown-parser';

interface IPostProps {
  post: any;
}

export default function Post({ post }: IPostProps) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {/* <Header /> */}
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title} | Next.js Blog Example with</title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
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
    </Layout>
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
