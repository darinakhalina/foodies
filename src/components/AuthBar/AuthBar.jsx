import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/ui/modalSlice';
import Button from '../Button/Button';
import css from './AuthBar.module.css';

const AuthBar = () => {
  const dispatch = useDispatch();

  return (
    <div className={css['auth-bar']}>
      <Button variant="ghost" size="sm" onClick={() => dispatch(openModal('login'))}>
        Sign in
      </Button>
      <Button variant="primary" size="sm" onClick={() => dispatch(openModal('register'))}>
        Sign up
      </Button>
    </div>
  );
};

export default AuthBar;
