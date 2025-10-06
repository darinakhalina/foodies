import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'instant' }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/user')) return;
    if (pathname.startsWith('/category')) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: behavior === 'smooth' ? 'smooth' : 'auto',
    });
  }, [pathname, behavior]);

  return null;
}
