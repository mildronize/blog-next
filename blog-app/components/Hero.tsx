import React from 'react';
// import "../themes/font-awesome-all-5.2.0.css";
import Button from './Button';
// import UserLinks from "./UserLinks/UserLinks";
// import config from "../../data/SiteConfig";
import { IHero, IUserLink } from '@thadaw.com/data';

import UserLinks from './UserLinks';

interface IHeroProps extends IHero {
  userLinks: IUserLink[];
}

export default function Hero({ title, tagline, userLinks }: IHeroProps) {
  return (
    <div className="pt-10 mb-24">
      <h2 className="text-4xl font-heading leading-11 tracking-tighter md:tracking-normal">
        {title}
        <span className="text-slate-400">
          {` `}
          {tagline}
        </span>
      </h2>
      <div className="mt-10">
        <Button href="/about">👤&nbsp; About Me</Button>
        <Button href="https://bit.ly/mildthada-notion-cv-v3" target="_blank">
          📄&nbsp; Resume
        </Button>
        <div className="mt-6">
          <div className="mb-2">Getting to know me: </div>
          <UserLinks userLinks={userLinks} />
        </div>
      </div>
    </div>
  );
}

// const Social = styled.p`
//   margin-left: 8px;
//   margin-top: 20px;
//   font-size: 0.7rem;
// `;
