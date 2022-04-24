import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Topbar from './Topbar'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Topbar />
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
