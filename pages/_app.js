import '../styles/index.css'
import { ClientReload } from '@/components/ClientReload'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function MyApp({ Component, pageProps }) {
  return <>
    {isDevelopment && isSocket && <ClientReload />}
    <Component {...pageProps} />
  </>
}
