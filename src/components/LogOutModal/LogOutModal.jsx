import { useState } from 'react';
import Button from '../Button/Button';
import styles from './LogOutModal.module.css';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { closeModal } from '../../redux/ui/modalSlice';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const confirmLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logout()).unwrap();
      dispatch(closeModal());
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : err?.message;
      toast.error(errorMessage || 'Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Log out</h2>
      <p className={styles.text}>You can always log back in at any time.</p>
      <div className={styles.buttonsContainer}>
        <Button
          variant="primary"
          className={styles.modalButton}
          onClick={confirmLogout}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Log Out
        </Button>

        <Button
          variant="secondary"
          className={`${styles.modalButton} ${styles.modalButtonSize}`}
          onClick={onClose}
          isDisabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default LogOutModal;
