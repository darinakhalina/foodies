import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './LogOutModal.module.css';

const LogOutModal = ({ onConfirm, onClose, isLoading = false }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Log Out</h2>
        <p className={styles.text}>You can always log back in at my time.</p>

        <div className={styles.buttonsContainer}>
          <Button
            variant="primary"
            className={styles.modalButton}
            onClick={onConfirm}
            isLoading={isLoading}
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
    </Modal>
  );
};

export default LogOutModal;
