import React from 'react';
import Footer from './PageFooter';
import Meta, { IMetaProps } from './PageMeta';
import Topbar from './Topbar';

interface ILayoutProps extends IMetaProps {
  children?: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <Meta {...props} />
      <Topbar />
      <div className="min-h-screen">
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
}
