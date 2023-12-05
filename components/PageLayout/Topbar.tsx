import { Container } from '@thadaw.com/components/layouts';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';

export default function Topbar() {
  return (
    <>
      <section className="fixed top-0 w-full z-10 m-0 overflow-hidden shadow-md dark:shadow-gray-800 py-3 bg-white dark:bg-gray-800 transition-colors duration-200 ease-in">
        <Container wide>
          <div className="flex-row flex items-center justify-between">
            <Logo />
            <div className="flex-row flex items-center">
              <Menu href="/talks">Talks</Menu>
              <Menu href="/search">
                {/* https://reactsvgicons.com/search?q=search // icon:search | Ionicons https://ionicons.com/ | Ionic Framework */}
                <svg viewBox="0 0 512 512" fill="currentColor" height="1.5rem" width="1.5rem">
                  <path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z" />
                </svg>
              </Menu>
              <ThemeSwitch />
            </div>
          </div>
        </Container>
      </section>
      <div className="mb-24 md:mb-32"></div>
    </>
  );
}

function Logo() {
  return (
    <div className="font-bold text-xl text-blue-600 dark:text-blue-500 font-sans">
      <Link href="/" className="hover:text-blue-500 dark:hover:text-blue-600">
        Thada W.
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
    <Link
      href={href}
      className="font-sans hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-md text-md font-medium"
    >
      {children}
    </Link>
  );
}
