import React from 'react';
// import "../themes/font-awesome-all-5.2.0.css";
// import LinkButton from "./Button";
// import UserLinks from "./UserLinks/UserLinks";
// import config from "../../data/SiteConfig";
import { IHero } from '@thadaw.com/data';
import Link from 'next/link';

export default function Hero({ title, tagline }: IHero) {
  return (
    <div className="pt-10 mb-24">
      <h2 className="text-4xl font-heading leading-11 tracking-tighter md:tracking-normal">
        {title}
        <span className="text-slate-400">
          {` `}
          {tagline}
        </span>
      </h2>
      <div className='mt-10'>
        <Button href="/about" >👤&nbsp; About Me</Button>
        <Button href="https://bit.ly/mildthada-notion-cv-v3" target="_blank">📄&nbsp; Resume</Button>
        {/* <Social>Getting to know me: <UserLinks config={config} /></Social> */}
      </div>
    </div>
  );
}


// const Social = styled.p`
//   margin-left: 8px;
//   margin-top: 20px;
//   font-size: 0.7rem;
// `;

interface IButtonProps {
  target?: React.HTMLAttributeAnchorTarget;
  href: string;
  children: React.ReactNode;
}

function Button({ children, href, target }: IButtonProps) {
  const className = 'font-bold p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white font-sans';
  if (target)
    return <a href={href} target={target} className={className}>{children}</a>;
  return (
    <Link href={href}>
      <a target={target} className={className}>{children}</a>
    </Link>
  )
}