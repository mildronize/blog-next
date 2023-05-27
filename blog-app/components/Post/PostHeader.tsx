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
      <div className="sm:mx-0">
        {/* <CoverImage title={title} src={coverImage} height={620} width={1240} /> */}
      </div>
      <div className="mx-auto -mt-10">
        <div className="block md:hidden mb-6">{/* <Avatar name={author.name} picture={author.picture} /> */}</div>
        <div className="mb-12 sm:text-md text-sm text-slate-500">
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
