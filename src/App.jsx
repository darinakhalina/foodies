import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const PostPage = lazy(() => import('./pages/PostPage/PostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path=":id" element={<PostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
