import React from 'react';
import Footer from './footer';
import Meta from './meta';
import Topbar from './Topbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Meta />
      <Topbar />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
