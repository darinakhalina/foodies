import Button from '../Button/Button';
import styles from './LogOutModal.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { closeModal } from '../../redux/ui/modalSlice';

const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const confirmLogout = async () => {
    await dispatch(logout());
    dispatch(closeModal());
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Log out</h2>
      <p className={styles.text}>You can always log back in at any time.</p>
      <div className={styles.buttonsContainer}>
        <Button variant="primary" className={styles.modalButton} onClick={confirmLogout}>
          Log Out
        </Button>

        <Button
          variant="secondary"
          className={`${styles.modalButton} ${styles.modalButtonSize}`}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default LogOutModal;
