import PostPreview from './post-preview';

interface IMoreStoriesProps {
  posts: {
    slug: string;
    title: string;
    date: string;
  }[];
}

export default function MoreStories({ posts }: IMoreStoriesProps) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">More Stories</h2>
      <div className="">
        {posts.map(post => (
          <PostPreview key={post.slug} title={post.title} date={post.date} slug={post.slug} />
        ))}
      </div>
    </section>
  );
}
