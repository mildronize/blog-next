// Ref from https://github.com/satnaing/astro-paper
import DateFormatter from './DateFormatter';
// import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: Partial<{
    title?: string | undefined;
    slug?: string | undefined;
    date?: string | null | undefined;
  }>;
}

export default function Card({ href, frontmatter }: Props) {
  const { title, date, slug } = frontmatter;
  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h3 className="text-lg font-medium decoration-dashed hover:underline">{title}</h3>
      </a>
      <div className="mb-12 text-md text-slate-500 dark:text-slate-300 flex items-center">
          {/* bxs-calendar-event, https://reactsvgicons.com/search?q=calendar */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            className="mr-1 text-lg"
          >
            <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z" />
          </svg>

          <DateFormatter dateString={date || ''} />
        </div>
      {/* <p>{description}</p> */}
    </li>
  );
}
