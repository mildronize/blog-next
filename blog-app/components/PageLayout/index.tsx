import React from 'react';
import Footer from './footer';
import Meta, { IMetaProps } from './meta';
import Topbar from './Topbar';

interface ILayoutProps extends IMetaProps {
  children?: React.ReactNode;
}

export default function Layout({ children, defaultTitle, pageTitle }: ILayoutProps) {
  return (
    <>
      <Meta defaultTitle={defaultTitle} pageTitle={pageTitle} />
      <Topbar />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
