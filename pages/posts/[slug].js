import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/postDataProvider'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import MarkdownParser from '../../lib/MarkdownParser'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {/* <Header /> */}
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
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
  )
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'path',
    // 'author',
    'content',
    // 'ogImage',
    // 'coverImage',
  ])

  const markdownParserOption = {
    relativePath: post.path
  }
  
  const content = await (new MarkdownParser(post.content || '', markdownParserOption)).toHtml()

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
