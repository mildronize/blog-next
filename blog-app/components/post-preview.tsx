import DateFormatter from './date-formatter'
import Link from 'next/link'

interface IPostPreviewProps {
  title: string;
  date: string;
  slug: string;
}

export default function PostPreview({
  title,
  date,
  slug,
}: IPostPreviewProps) {
  return (
    <div>
      <div className="mb-10">
      </div>
      <h3 className="text-xl mb-3 leading-snug  tracking-tighter md:tracking-normal">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}
