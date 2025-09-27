import { useEffect } from 'react';
import Modal from 'react-modal';
import css from './MenuSidePanel.module.css';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';

Modal.setAppElement('#root');

const MenuSidePanel = ({ isOpen, onClose, children }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  useLockBodyScroll(isOpen && isMobile);

  useEffect(() => {
    if (!isMobile && isOpen) {
      onClose();
    }
  }, [isMobile, isOpen, onClose]);

  if (!isMobile) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={300}
      overlayClassName={{
        base: css.overlay,
        afterOpen: css.overlayAfterOpen,
        beforeClose: css.overlayBeforeClose,
      }}
      className={{
        base: css.sidepanel,
        afterOpen: css.sidepanelAfterOpen,
        beforeClose: css.sidepanelBeforeClose,
      }}
      style={{
        content: {
          inset: 'auto',
          top: 0,
          right: 0,
          bottom: 0,
          left: 'auto',
          width: '100%',
          padding: 0,
          border: 'none',
          background: 'transparent',
        },
      }}
    >
      <div className={css.inner}>
        <div className={css.header}>
          <span className={css.logoTitle}>foodies</span>
          <button
            type="button"
            onClick={onClose}
            className={css.closeBtn}
            aria-label="Close"
            title="Close"
          >
            <svg className={css.closeIcon}>
              <use href="/images/icons.svg#icon-close" />
            </svg>
          </button>
        </div>
        <div className={css.content}>{children}</div>
      </div>
    </Modal>
  );
};

export default MenuSidePanel;
