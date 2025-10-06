import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectIsFetchingUser } from '../../redux/auth/selectors.js';
import { selectModalType } from '../../redux/ui/modalSlice.js';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../redux/ui/modalSlice.js';
import { useEffect, useState } from 'react';

export default function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isFetchingUser = useSelector(selectIsFetchingUser);
  const currentModal = useSelector(selectModalType);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isFetchingUser) {
      setChecked(true);
    }
  }, [isFetchingUser]);

  useEffect(() => {
    if (!checked) return;

    if (!isLoggedIn) {
      navigate('/', { replace: true });

      if (currentModal !== 'login') {
        dispatch(openModal('login'));
      }
    }
  }, [isLoggedIn, checked, currentModal, dispatch, navigate]);

  if (!checked) return null;

  return isLoggedIn ? children : null;
}
