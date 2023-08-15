import PageLayout from '@thadaw.com/components/PageLayout';
import PostBody from '@thadaw.com/components/Post/PostBody';
import UserLinks from '@thadaw.com/components/UserLinks';
import { Container } from '@thadaw.com/components/layouts';
import { userLinks } from '@thadaw.com/data/siteMetadata';
import MarkdownParser from '@thadaw.com/libs/markdown-parser';
import { ReturnTypeGetStaticProps } from '@thadaw.com/types';

const markdown = `
# About
Hi, I'm Mild, Thada, Software Engineer & DevSecOps, Based in Hatyai, Thailand,  👨‍💻 Work Remotely

**Key Expertise**

- Azure (App Service, SQL Sver)
- GitHub Action
- Terraform
- Time Series Database

**Technical Skills**

- Languages: \`TypeScript\`, \`Go Lang\`, \`C#\`,  \`Python\`
- DevOps Tools: GitHub Action, Terraform
- Platform/Framework: [ASP.NET](http://asp.NET) Core, Node.JS (TypeScript), React (TypeScript), Flutter, NestJS, NextJS
- Database: MongoDB, MySQL, OpenTSDB, Firebase & Firestore
- Tools: Docker, Memcached, Notion

**Thada’s Community Engagement**

- https://thadaw.notion.site/Thada-s-Community-Engagement-064f79a8e85e4532a4ab39e7831f34aa

or checkout [My Talks](/talks)
`;

export default function AboutPage({ htmlContent }: ReturnTypeGetStaticProps<typeof getStaticProps>) {
  return (
    <PageLayout pageTitle="About">
      <Container>
        <div className="mb-10">
          <PostBody content={htmlContent} />
        </div>
        <UserLinks userLinks={userLinks} className="text-xl " />
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const htmlContent = await new MarkdownParser(markdown).toHtml();

  return {
    props: {
      htmlContent,
    },
  };
}
