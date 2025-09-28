import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, redirectTo = '/' }) {
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
