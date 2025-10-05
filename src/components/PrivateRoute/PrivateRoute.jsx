import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../redux/ui/modalSlice.js';
import { useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/', { replace: true });
      dispatch(openModal('login'));
    }
  }, [isLoggedIn, dispatch, navigate]);

  return isLoggedIn ? children : null;
}
