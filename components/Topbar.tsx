import siteMetadata from '@/data/siteMetadata';
import Container from './container';

export default function Topbar() {
  return (
    <>
    <section className="fixed top-0 w-full z-10 m-0 overflow-hidden bg-white shadow-lg py-4">
      <Container wide>
        <div className="flex-row flex items-center justify-between">
          <div className="font-bold text-xl text-blue-600">Thada W.</div>
          <div>
            <a
              href="#"
              className="text-slate-800 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Posts
            </a>
            <a
              href="#"
              className="text-slate-800 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Talks
            </a>
          </div>
        </div>
      </Container>
    </section>
    <div className="mb-32"></div>
    </>
  );
}
