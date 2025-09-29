import { useState, useCallback } from 'react';
import Button from '../Button/Button.jsx';
import SignInModal from '../SignInModal/SignInModal.jsx';
import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import css from './AuthBar.module.css';

const AuthBar = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openSignInModal = useCallback(() => {
    setSignInOpen(true);
  }, []);

  const openSignUpModal = useCallback(() => {
    setSignUpOpen(true);
  }, []);

  const closeSignInModal = useCallback(() => {
    setSignInOpen(false);
  }, []);

  const closeSignUpModal = useCallback(() => {
    setSignUpOpen(false);
  }, []);

  return (
    <div className={css['auth-bar']}>
      <Button variant="ghost" size="sm" onClick={openSignInModal}>
        Sign in
      </Button>
      <Button variant="primary" size="sm" onClick={openSignUpModal}>
        Sign up
      </Button>

      {isSignInOpen && <SignInModal isOpen={isSignInOpen} onClose={closeSignInModal} />}
      {isSignUpOpen && <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUpModal} />}
    </div>
  );
};

export default AuthBar;
