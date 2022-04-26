import '../styles/index.css';
import '../styles/prism-template.css'
import { ClientReload } from '@/components/ClientReload';
import { ThemeProvider } from 'next-themes';
import siteMetadata from '@/data/siteMetadata';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        {isDevelopment && isSocket && <ClientReload />}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
