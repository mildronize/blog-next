import React, { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
import PageLayout from '@thadaw.com/components/PageLayout';

function getPath() {
  if (!window) console.log('Rendering on server');
  console.log(window.location.pathname);
}

export default function Page404() {
  //   getPath();
  useEffect(() => {
    getPath();
  }, []);
  const router = useRouter();

  return (
    <PageLayout pageTitle="404">
      <h1>Not found</h1>
      <div>{router.pathname}</div>
    </PageLayout>
  );
}
