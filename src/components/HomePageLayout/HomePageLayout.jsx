import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import css from './HomePageLayout.module.css';

const HomeLayout = () => {
  return (
    <div className={css.layout}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Footer />
    </div>
  );
};

export default HomeLayout;
