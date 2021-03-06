import React from 'react';
import Footer from './PageFooter';
import Meta, { IMetaProps } from './PageMeta';
import Topbar from './Topbar';

interface ILayoutProps extends IMetaProps {
  children?: React.ReactNode;
}

export default function Layout({ children, pageTitle }: ILayoutProps) {
  return (
    <>
      <Meta pageTitle={pageTitle} />
      <Topbar />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
