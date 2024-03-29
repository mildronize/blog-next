import PageLayout from '@thadaw.com/components/PageLayout';
import PostBody from '@thadaw.com/components/Post/PostBody';
import { Container } from '@thadaw.com/components/layouts';
import MarkdownParser from '@thadaw.com/libs/markdown-parser';
import { ReturnTypeGetStaticProps } from '@thadaw.com/types';

const markdown = `
# Talks
### Upcoming
- Aug 26, 2023 - ***Serverless Container on Microsoft Azure***
  - Event: zure Developer Day 2023 at Seven Peaks Software (Thailand)

### 2023

- July 22, 2023 - ***TypeScript for DevOps***
  - Event: TypeScript Meetup Thailand
  - [Recorded on Youtube](https://youtu.be/xBJJsc-AqMs)

- June 23, 2023 - ***Serverless, สร้าง App เร็วขึ้นโดยที่ไม่ต้องจัดการ Infra*** -- มี 2 ช่วง ช่วงแรก พี่ป้องกับผมจะมาเล่า เรื่องพื้นฐานของ Cloud และทำไมถึงเราควรใช้งาน Cloud ช่วงที่ 2 ผมจะสาธิต Cloud โดยผ่านตัวอย่าง Serverless มีทั้ง Azure Static Web App, Azure Functions, Azure SignalR โดยทำ แอพแบบ Realtime ง่ายๆ เข้าใจนิยามของ Serverless สาธิต Serverless เขียนด้วย TypeScript ข้อดี ข้อควรระวัง
  - [Recorded on Youtube](https://youtu.be/l5rrRHmrZGc)
  - [GitHub Repo](https://github.com/mildronize/cloud-native-thaiban-serverless)
  - [Slide](https://docs.google.com/presentation/d/1DKitvc9jITsy20N7nFVM5BvQT4qM7GoMVucjrTMif98/edit?usp=sharing)

- May 6, 2023 - ***TypeScript in VS Code และ GitHub Copilot โดยใช้ Github Actions***
  - Event: VS Code Day 2023 Thailand at Virtual Event, Hosted by Microsoft Thailand
  - [Recorded on Youtube](https://youtu.be/9KTFRS4k7Ao)
  - [GitHub Repo](https://github.com/mildronize/vscode-day-2023-typescript-with-github-copilot)
  - [Slide](https://docs.google.com/presentation/d/1NTcnnatGU3C32JE-nRVZdEQ8IDODN5I-ILl3GnDxsoM/edit?usp=sharing)
  - [Recap blog จากคุณ Chatri](https://naiwaen.debuggingsoft.com/2023/05/vscode-day-th/)

- Mar 25, 2023 - ***Empowering TypeScript on Azure Functions ด้วย Nammatham***
  - Event: Azure Open Source Day Thailand 2023 at Microsoft Thailand
  - [Recorded on Youtube](https://youtu.be/n6B4-5Lt2h0)
  - [GitHub Repo](https://github.com/thaitype/nammatham) 50 stars
  - [Slide](https://docs.google.com/presentation/d/1WUIXaUxXaiixZ2bgGCfx-f4Gdrmjl4RfbwKaEfAC6t4/edit?usp=sharing)

- Jan 28, 2023, ***Modernize ASP.NET WebForms Legacy App with Fully Automated Ecosystem*** -- แชร์ประสบการณ์การทำ DevOps บน Legacy Software ว่ากว่าที่ Software อายุเทคโนโลยีเก่ากว่า 8-9 ปี เอามาขึ้น Pipeline ทำ Automate อย่างไร (DevOps for Legacy Software)
  - Event: Barcamp Songkhla #7 @ 8th Floor LRC Building, Prince of Songkla University 
  - [Recorded on Youtube](https://youtu.be/j00My292s_I)
  - [Live on Facebook](https://fb.watch/mrfFVe8XYF/?mibextid=2Rb1fB)
  - [Slide](https://docs.google.com/presentation/d/1uAZyNr3B4_3Gs4iOXpdliklYvtPaAo2murnIwnbeFEk/edit?usp=sharing)

### 2022
- May 7, 2022 - ***Dealing with more than 100 secrets on GitHub Actions using Mozilla SOPS and Azure Key Vault*** -- The problem we're facing with more than 100 secrets in our environment and how to we utilize implementation method and still provide acceptable security level. Lesson learn about how we manage secrets using Mozilla SOPS and Azure Key Vault on GitHub Actions deployment pipeline.
  - Event: Global Azure Thailand.
  - [Demo Repo in Talk](https://github.com/mildronize/100-secrets-github-actions-sops-with-azure-key-vault)
  - [SOPS for Azure Key Vault Boilerplate on GitHub](https://github.com/mildronize/sops-with-azure-keyvault-secrets)

- May 12, 2022 - ***Create your own naming convention of resources with Terraform Module*** -- Cloud resource name is one of the most troublesome tasks. When it is created, it is hard to rename. Bad naming can cause such a chaotic management. Using other convention might not be compatible with your organization. Let’s define your own naming convention.
  - Event: Cloud Native Night bangkok

- Apr 7, 2022 - ***Deploy .NET Core 6 to Multiple Azure App Services using GitHub Actions Matrix*** -- Demonstrate how to organize deployment pipeline to multiple Azure App Services and GitHub Secrets in maintainable way.
  - @ Cloud Native Night: GitOps Experience on Azure
  - Hosted by Microsoft Thailand, KubeOps Skills
  - [Slide](https://docs.google.com/presentation/d/1ctnqJfWxpH-s5l7zkvN9tiXReuxeLajauWfsQ9CkGmU/edit?usp=sharing), [GitHub Repo in Demo](https://github.com/mildronize/deploy-multiple-azure-app-services-using-github-actions-matrix)
  - [Meetup](https://www.meetup.com/cloud-native-bangkok-meetup-group/events/284972789/), [Facebook Event](https://www.facebook.com/events/549929293012414/), [Promoted Cover Image](/files/talks/2022-04-07.jpeg)

- Mar 24, 2022 - ***Test-Driven Development Training*** in T.T. Software Solution
  - [GitHub Repo](https://github.com/dotnetthailand/kata-workshop)

### 2018
- Sep 27, 2018 - ***“A Software Cache Mechanism for Reducing the OpenTSDB Query Time,”*** in proceeding of The 18th International Symposium on Communications and Information Technologies (ISCIT 2018)
  - @Sukosol Hotel, Bangkok, Thailand
  - Authors: Thada Wangthammang and Pichaya Tandayya
  - [Publication @ IEEE Xplore](https://ieeexplore.ieee.org/document/8587857)
  - [Download Publication in PDF](/files/publications/2018%20-%20A%20Software%20Cache%20Mechanism%20for%20Reducing%20the%20OpenTSDB%20Query%20Time.pdf)
  - [Source Code on GitHub](https://github.com/mildronize?tab=repositories&q=tscache)

- May 8, 2018 - ***“Registration Assistant Application using Local Search and Tabu List Technique”*** Thaksin University Journal Special Edition for 28th National Conference of Thaksin University, 2018.
  - Authors: Thada Wangthammang, Seksun Suwanmanee, Touchai Angchuan, and Sangsuree Vasupongayya
  - [Download Publication in PDF (Thai)](/files/publications/2018%20-%20Registration%20Assistant%20Application%20using%20Local%20Search%20and%20Tabu%20List%20Technique.pdf)
  - [Source Code on GitHub](https://github.com/mildronize/R2ALS)

### 2015
- Oct 24, 2015: ***Let's Make a Blog in Developer Way***
  - @Tuber, Songkhla, Thailand
  - [Slides](https://github.com/mildronize/slides/tree/master/slides/barcampsk4-blog-dev-with-github-page)
`;

export default function TalksPage({ htmlContent }: ReturnTypeGetStaticProps<typeof getStaticProps>) {
  return (
    <PageLayout pageTitle="Talks">
      <Container>
          <PostBody content={htmlContent} />

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
