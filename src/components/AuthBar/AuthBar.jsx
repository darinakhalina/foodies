import { useCallback } from 'react';
import Button from '../Button/Button.jsx';
import css from './AuthBar.module.css';

const AuthBar = () => {
  const openSignInModal = useCallback(() => {
    console.log('Open Sign In Modal');
  }, []);
  const openSignUpModal = useCallback(() => {
    console.log('Open Sign Up Modal');
  }, []);

  return (
    <div className={css['auth-bar']}>
      <Button variant="ghost" size="sm" onClick={openSignInModal}>
        Sign in
      </Button>
      <Button variant="primary" size="sm" onClick={openSignUpModal}>
        Sign up
      </Button>
    </div>
  );
};

export default AuthBar;
