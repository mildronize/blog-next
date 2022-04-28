import { Container } from '@thadaw.com/components/layouts';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';

export default function Topbar() {
  return (
    <>
      <section className="fixed top-0 w-full z-10 m-0 overflow-hidden shadow-md dark:shadow-gray-800 py-3 bg-white dark:bg-gray-900 transition-colors duration-200 ease-in">
        <Container wide>
          <div className="flex-row flex items-center justify-between">
            <Logo />
            <div className="flex-row flex items-center">
              <Menu href="#">Posts</Menu>
              <Menu href="#">Talks</Menu>
              <ThemeSwitch />
            </div>
          </div>
        </Container>
      </section>
      <div className="mb-32"></div>
    </>
  );
}

function Logo() {
  return (
    <div className="font-bold text-xl text-blue-600 dark:text-blue-500 font-sans">
      <Link href="/">
        <a className="hover:text-blue-500 dark:hover:text-blue-600">Thada W.</a>
      </Link>
    </div>
  );
}

interface IMenuProps {
  href: string;
  children?: React.ReactNode;
}

function Menu({ href, children }: IMenuProps) {
  return (
    // <div className="-mt-3 mx-2">
    <Link href={href}>
      <a className="font-sans hover:bg-slate-100 hover:text-slate-900 dark:hover:text-slate-50 dark:hover:bg-gray-800 px-4 py-2 rounded-md text-md font-medium">
        {children}
      </a>
    </Link>
    // </div>
  );
}
