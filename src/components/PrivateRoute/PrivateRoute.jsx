import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { openModal } from '../../redux/ui/modalSlice';
import { useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(openModal('login'));
      console.log('test');
    }
  }, [isLoggedIn, dispatch]);

  return isLoggedIn ? children : <Navigate to="/" replace />;
}
