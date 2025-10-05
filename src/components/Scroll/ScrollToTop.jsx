import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'instant' }) {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (behavior === 'instant') {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname, search, behavior]);

  return null;
}