import ReactModal from 'react-modal';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import css from './Modal.module.css';

ReactModal.setAppElement('#root');

const Modal = ({ children, isOpen, onClose }) => {
  useLockBodyScroll(isOpen);

  return (
    <ReactModal
      className={css['modal']}
      overlayClassName={css['overlay']}
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      closeTimeoutMS={300}
    >
      <button
        type="button"
        onClick={onClose}
        className={css['modal-btn-close']}
        aria-label="Close"
        title="Close"
      >
        <svg className={css['modal-btn-close-icon']}>
          <use href="/images/icons.svg#icon-close" />
        </svg>
      </button>
      <div className={css['modal-content']}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
