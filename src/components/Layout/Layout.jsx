import { Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.jsx';

const Layout = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const KEY = 'scrollY:layout';
    const saved = sessionStorage.getItem(KEY);
    if (saved) {
      requestAnimationFrame(() => {
        window.scrollTo(0, Number(saved));
      });
    }

    const save = () => {
      try {
        sessionStorage.setItem(KEY, String(window.scrollY));
      } catch {}
    };

    window.addEventListener('beforeunload', save);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') save();
    });

    return () => {
      window.removeEventListener('beforeunload', save);
    };
  }, []);

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
