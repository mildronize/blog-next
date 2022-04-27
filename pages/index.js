import Container from '../components/Container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/content-service'
import Head from 'next/head'
import Topbar from '@/components/Topbar'


export default function Index({allPosts}) {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with</title>
        </Head>
       
          {/* <Intro /> */}
          {/* <Topbar /> */}
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

  // console.log(allPosts);

  return {
    props: { allPosts },
  }
}
