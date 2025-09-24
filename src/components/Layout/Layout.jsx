import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';
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
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Footer />
    </div>
  );
};

export default Layout;
