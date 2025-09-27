import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../redux/test/selectors';

export default function PublicRoute({ children, restricted = false, redirectTo = '/' }) {
  const isLoggedIn = useSelector(selectLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
}
