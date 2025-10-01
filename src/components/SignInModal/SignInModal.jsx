import SignInForm from '../SignInForm/SignInForm';
import styles from './SignInModal.module.css';

const SignInModal = ({ onClose, onSwitch }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <SignInForm onSuccess={onClose} />
      <p className={styles.switchText}>
        Don&apos;t have an account?{' '}
        <button type="button" onClick={onSwitch} className={styles.switchButton}>
          Create an account
        </button>
      </p>
    </div>
  );
};

export default SignInModal;
