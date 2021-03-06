import Head from 'next/head';
import { siteMetadata } from '@thadaw.com/data';

export interface IMetaProps {
  pageTitle?: string;
}

export default function Meta({ pageTitle }: IMetaProps) {
  const defaultTitle = siteMetadata.title;
  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  return (
    <Head>
      <title>{title}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={`A statically generated blog example using Next.js and `} />
      <meta property="og:image" content={'img-url.png'} />
    </Head>
  );
}
