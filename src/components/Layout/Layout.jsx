import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className={css.layout}>
      <header>Header</header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
