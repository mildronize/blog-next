import Container from '../components/Container'
import MoreStories from '../components/more-stories'
import Layout from '../components/layout'
import { getAllPosts } from '../libs/content-service'
import Head from 'next/head'

interface IIndexProps {
  allPosts: any[]
}

export default function Index({allPosts}: IIndexProps) {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with</title>
        </Head>
          <Container>
            <MoreStories posts={allPosts} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
  ])
  
  return {
    props: { allPosts },
  }
}
