import markdownStyles from './markdown-styles.module.css'

interface IPostBodyProps {
  content: string;
}

export default function PostBody({ content }: IPostBodyProps) {
  return (
    <div className="prose prose-slate dark:prose-dark">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
