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
        <div className="mb-12 sm:text-md text-sm">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}

function PostTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl lg:text-3xl leading-tight leading-11 lg:leading-12 mb-12 text-left">
      {children}
    </h1>
  );
}
