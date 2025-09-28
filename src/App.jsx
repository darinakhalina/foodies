import { lazy } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import HomePageLayout from './components/HomePageLayout/HomePageLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { selectIsFetchingUser } from './redux/auth/selectors';
import { fetchUser } from './redux/auth/operations';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const RecipePage = lazy(() => import('./pages/RecipePage/RecipePage'));
const DemoPage = lazy(() => import('./pages/DemoPage/DemoPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<HomePageLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route
          path="recipe/add"
          element={
            <PrivateRoute redirectTo="/login">
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
        />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
