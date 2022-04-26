import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from '../components/cover-image'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {/* <Avatar name={author.name} picture={author.picture} /> */}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {/* <CoverImage title={title} src={coverImage} height={620} width={1240} /> */}
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {/* <Avatar name={author.name} picture={author.picture} /> */}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

function PostTitle({ children }) {
  return (
        // <h1 className="text-3xl leading-snug md:text-2xl md:leading-snug  lg:text-5xl lg:text-5xl:leading-12">  
    <h1 className="text-3xl lg:text-5xl leading-tight lg:leading-14 mb-12  font-bold tracking-tighter text-left">

      {children}
    </h1>
  )
}
