import Link from 'next/link';

interface IButtonProps {
  target?: React.HTMLAttributeAnchorTarget;
  href: string;
  children: React.ReactNode;
}

export default function Button({ children, href, target }: IButtonProps) {
  const className = 'font-bold p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white font-sans';
  if (target)
    return (
      <a href={href} target={target} className={className}>
        {children}
      </a>
    );
  return (
    <Link href={href}>
      <a target={target} className={className}>
        {children}
      </a>
    </Link>
  );
}
