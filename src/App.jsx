import { lazy } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import HomePageLayout from './components/HomePageLayout/HomePageLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Loader from './components/Loader/Loader';

import { selectIsFetchingUser } from './redux/auth/selectors';
import { fetchUser } from './redux/auth/operations';

// Pages
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const UserPageLayout = lazy(() => import('./pages/UserPage/UserPageLayout'));
const RecipePage = lazy(() => import('./pages/RecipePage/RecipePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <Routes>
      {/* Public home shell */}
      <Route path="/" element={<HomePageLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Main app shell */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="category/:category" element={<CategoryPage />} />
        <Route path="recipe/:id" element={<RecipePage />} />

        {/* Private routes with nested user tabs */}
        <Route
          path="recipe/add"
          element={
            <PrivateRoute>
              <AddRecipePage />
            </PrivateRoute>
          }
        />
        <Route
          path="user/:id"
          element={
            <PrivateRoute redirectTo="/login">
              <UserPage />
            </PrivateRoute>
          }
        >
          <Route index element={<UserPageLayout />} />
          <Route path="recipes" element={<UserPageLayout />} />
          <Route path="favorites" element={<UserPageLayout />} />
          <Route path="followers" element={<UserPageLayout />} />
          <Route path="following" element={<UserPageLayout />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
