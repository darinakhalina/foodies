import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { openModal } from '../../redux/auth/modalSlice.js';
import { useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn === false) {
      dispatch(openModal(true));
    }
  }, [isLoggedIn, dispatch]);

  return isLoggedIn ? children : <Navigate to={'/'} />;
}
