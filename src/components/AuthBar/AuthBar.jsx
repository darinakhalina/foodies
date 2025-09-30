import { useDispatch, useSelector } from 'react-redux';
import { openSignIn, closeSignIn, openSignUp, closeSignUp } from '../../redux/modal/slice.js';
import Button from '../Button/Button.jsx';
import SignInModal from '../SignInModal/SignInModal.jsx';
import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import css from './AuthBar.module.css';

const AuthBar = () => {
  const dispatch = useDispatch();
  const { isSignInOpen, isSignUpOpen } = useSelector(state => state.modal);

  return (
    <div className={css['auth-bar']}>
      <Button variant="ghost" size="sm" onClick={() => dispatch(openSignIn())}>
        Sign in
      </Button>
      <Button variant="primary" size="sm" onClick={() => dispatch(openSignUp())}>
        Sign up
      </Button>

      {isSignInOpen && (
        <SignInModal isOpen={isSignInOpen} onClose={() => dispatch(closeSignIn())} />
      )}
      {isSignUpOpen && (
        <SignUpModal isOpen={isSignUpOpen} onClose={() => dispatch(closeSignUp())} />
      )}
    </div>
  );
};

export default AuthBar;
