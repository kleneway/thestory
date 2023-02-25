// simple page that just redirects to /timeline/1
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Timeline() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/timeline/1');
  }, []);
  return null;
}
