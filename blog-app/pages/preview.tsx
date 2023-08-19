import { useEffect } from 'react';

export default function Preview() {
  useEffect(() => {
    if (window) {
      window.location.replace('https://victorious-rock-0dbac5500-preview.eastasia.1.azurestaticapps.net/');
    }
  }, []);
  return <></>;
}
