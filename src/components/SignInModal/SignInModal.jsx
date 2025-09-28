import Modal from '../Modal/Modal';
import SignInForm from '../SignInForm/SignInForm';
import styles from './SignInModal.module.css';

const SignInModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sign In</h2>
        <SignInForm />
      </div>
      <p className={styles.switchText}>
        Don't have an account?{' '}
        <button type="button" onClick={() => {}} className={styles.switchButton}>
          Create an account
        </button>
      </p>
    </Modal>
  );
};

export default SignInModal;
