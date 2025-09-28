import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePageLayout from './components/HomePageLayout/HomePageLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const RecipePage = lazy(() => import('./pages/RecipePage/RecipePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <>
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
