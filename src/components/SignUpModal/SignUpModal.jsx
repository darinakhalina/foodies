import SignUpForm from '../SignUpForm/SignUpForm';
import styles from './SignUpModal.module.css';

const SignUpModal = ({ onClose, onSwitch }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <SignUpForm onSuccess={onClose} />
      <p className={styles.switchText}>
        I already have an account?{' '}
        <button type="button" onClick={onSwitch} className={styles.switchButton}>
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpModal;
