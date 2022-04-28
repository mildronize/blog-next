import PostPreview from './Post/PostPreview';

interface IMoreStoriesProps {
  posts: {
    slug: string;
    title: string;
    date: string;
  }[];
}

export default function PostList({ posts }: IMoreStoriesProps) {
  return (
    <section>
      <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight font-heading">Recent Posts</h2>
      <div className="">
        {posts.map(post => (
          <PostPreview key={post.slug} title={post.title} date={post.date} slug={post.slug} />
        ))}
      </div>
    </section>
  );
}
