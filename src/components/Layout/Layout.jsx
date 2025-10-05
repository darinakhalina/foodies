import { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import css from './Layout.module.css';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.jsx';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const KEY = `scroll:${location.pathname}${location.search}`;

    const saveScroll = () => {
      sessionStorage.setItem(KEY, String(window.scrollY));
    };

    window.addEventListener('beforeunload', saveScroll);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveScroll();
    });
    window.addEventListener('scroll', saveScroll);

    const saved = sessionStorage.getItem(KEY);
    if (saved) {
      const y = parseInt(saved, 10);
      let done = false;

      const observer = new MutationObserver(() => {
        const maxY = document.documentElement.scrollHeight - window.innerHeight;
        if (maxY >= y && !done) {
          done = true;
          observer.disconnect();
          window.scrollTo(0, y);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        if (!done) {
          window.scrollTo(0, y);
          observer.disconnect();
        }
      }, 1500);
    }

    return () => {
      window.removeEventListener('beforeunload', saveScroll);
      window.removeEventListener('scroll', saveScroll);
    };
  }, [location.pathname, location.search]);

  return (
    <div className={css.layout}>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Footer />
    </div>
  );
};

export default Layout;
