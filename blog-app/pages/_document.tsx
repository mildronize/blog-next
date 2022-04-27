import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400&display=swap"
          rel="stylesheet"
        ></link>
        <body className="bg-white dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
