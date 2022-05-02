// import PostPreview from './Post/PostPreview';
import Link from 'next/link';
import { parseISO, format, isValid, getYear } from 'date-fns';
import DateFormatter from './DateFormatter';
import { IPostSerializableJSON } from '@thadaw.com/libs/content-service';

interface IPostListByYearProps {
  posts: IPostSerializableJSON[];
}


export default function PostListByYear({ posts }: IPostListByYearProps) {
  return (
    <section>
      {getYearGroup(posts).map(year => (
        <div key={year}>
          <h2 className="mb-8 text-xl md:text-2xl font-bold tracking-tighter md:tracking-normal leading-tight font-heading">
            {year}
          </h2>
          <PostList posts={posts} year={year} />
        </div>
      ))}
    </section>
  );
}

interface IPostListProps extends IPostListByYearProps {
  year: number;
}

function PostList({ posts, year }: IPostListProps) {
  const parseYear = (post: IPostSerializableJSON) =>
    post.date && isValid(new Date(post.date)) ? parseInt(format(parseISO(post.date), 'yyyy')) : 0;
  return (
    <section>
      <div className="">
        {posts.map(
          post =>
            parseYear(post) === year && (
              <PostPreview key={post.slug} title={post.title || ''} date={post.date || ''} slug={post.slug || ''} />
            )
        )}
      </div>
    </section>
  );
}

function PostPreview({ title, date, slug }: IPostSerializableJSON) {
  return (
    <div>
      <div className="mb-10"></div>
      <h3 className="text-xl mb-3 leading-snug  tracking-tighter md:tracking-normal">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4">{date && <DateFormatter dateString={date} />}</div>
    </div>
  );
}

function getYearGroup(posts: IPostSerializableJSON[]){
  const yearSet = new Set<number>();
  posts.forEach(post => {
    if (post.date) {
      yearSet.add(parseInt(format(parseISO(post.date), 'yyyy')));
    }
  });
  return Array.from(yearSet).sort((a, b) => b - a);
}
