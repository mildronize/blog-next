import siteMetadata from '@/data/siteMetadata';
import Container from './container';
import ThemeSwitch from './ThemeSwitch';

export default function Topbar() {
  return (
    <>
    <section className="fixed top-0 w-full z-10 m-0 overflow-hidden shadow-lg py-4 bg-white dark:bg-black">
      <Container wide>
        <div className="flex-row flex items-center justify-between">
          <div className="font-bold text-xl text-blue-600 dark:text-blue-500">Thada W.</div>
          <div>
            <a
              href="#"
              className=" hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Posts
            </a>
            <a
              href="#"
              className=" hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Talks
            </a>
            <ThemeSwitch />
          </div>
        </div>
      </Container>
    </section>
    <div className="mb-32"></div>
    </>
  );
}
