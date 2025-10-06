import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ behavior = 'instant', targetCssSelector = null }) {
  const location = useLocation();

  useEffect(() => {
    const { pathname, search, state } = location;

    const isHomeWithQuery = pathname === '/' && !!search;
    if (isHomeWithQuery) return;
    if (state?.scrollToTop === false) return;

    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] === 'user' && parts.length > 2) return;

    const finalBehavior = behavior === 'smooth' ? 'smooth' : 'auto';

    requestAnimationFrame(() => {
      if (targetCssSelector) {
        document
          .querySelector(targetCssSelector)
          ?.scrollTo({ top: 0, left: 0, behavior: finalBehavior });
      } else {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({ top: 0, left: 0, behavior: finalBehavior });
      }
    });
  }, [
    location.key,
    location.pathname,
    location.search,
    location.state,
    behavior,
    targetCssSelector,
  ]);

  return null;
}
