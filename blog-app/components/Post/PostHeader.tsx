import DateFormatter from '../DateFormatter';

interface IPostHeaderProps {
  title: string;
  date: string;
}

export default function PostHeader({ title, date }: IPostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">{/* <Avatar name={author.name} picture={author.picture} /> */}</div>
      <div className="sm:mx-0">{/* <CoverImage title={title} src={coverImage} height={620} width={1240} /> */}</div>
      <div className="mx-auto -mt-10">
        <div className="block md:hidden mb-6">{/* <Avatar name={author.name} picture={author.picture} /> */}</div>
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

          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}

function PostTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl lg:text-4xl leading-relaxed lg:leading-normal md:tracking-normal tracking-tighter lg:leading-normal mb-12 text-left font-thai text-gray-700 dark:text-gray-200">
      {children}
    </h1>
  );
}
