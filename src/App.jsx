import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const UserPageLayout = lazy(() => import('./pages/UserPage/UserPageLayout'));

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
//const TestPostPage = lazy(() => import('./pages/TestPostPage/TestPostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="category/:category" element={<CategoryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    {/* User profile */}
    <Route path="user/:id" element={<UserPage />}>
      <Route index element={<UserPageLayout />} />
      <Route path="recipes" element={<UserPageLayout />} />
      <Route path="favorites" element={<UserPageLayout />} />
      <Route path="followers" element={<UserPageLayout />} />
      <Route path="following" element={<UserPageLayout />} />
    </Route>
  </Routes>
);

export default App;
