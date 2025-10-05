import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import css from './Layout.module.css';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.jsx';

const Layout = () => {
  return (
    <div className={css.layout}>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <ScrollRestoration />
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Footer />
    </div>
  );
};

export default Layout;
