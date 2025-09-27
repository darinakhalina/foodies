import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectLoggedIn } from '../../redux/test/selectors';

export default function PrivateRoute({ children, redirectTo = '/' }) {
  // const isLoggedIn = useSelector(selectLoggedIn);
  const isLoggedIn = false;
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
