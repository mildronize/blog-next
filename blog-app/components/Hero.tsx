import React from "react";
// import "../themes/font-awesome-all-5.2.0.css";
// import LinkButton from "./Button";
// import UserLinks from "./UserLinks/UserLinks";
// import config from "../../data/SiteConfig";
import { IHero } from "@thadaw.com/data";

export default function Hero({ title, tagline } : IHero) {
  return (
    <div className="pt-10 mb-24">
      <h2 className="text-4xl font-heading leading-11">{title}
        <span className="text-slate-400">
        {` `}{tagline}</span>
      </h2>
        {/* <LinkButton href="/about">👤&nbsp; About Me</LinkButton>
        <LinkButton href="/cv" target="_blank">📄&nbsp; Resume</LinkButton> */}
        {/* <Social>Getting to know me: <UserLinks config={config} /></Social> */}
    </div>
  );
};

// const Container = styled.div`

//   margin-bottom: 100px;

//   h2{
//     font-family: var(--font-family-inter);
//     font-size: 1.3rem;

//     ${onMobile} {
//       font-size: 1.6rem;
//     }

//   }
// `;


// const Subtitle = styled.span`
//   color: var(--colors-text-2);
// `;

// const Social = styled.p`
//   margin-left: 8px;
//   margin-top: 20px;
//   font-size: 0.7rem;
// `;
