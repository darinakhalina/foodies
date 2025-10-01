import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal.jsx';
import {
  closeModal,
  selectIsModalOpen,
  selectModalType,
  setModalType,
  selectModalProps,
} from '../../redux/ui/modalSlice';

function LoginContent({ onSwitch, onClose }) {
  return (
    <div>
      <h2>Login</h2>
      <button type="button" onClick={() => onSwitch('register')}>
        Go to Register
      </button>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

function RegisterContent({ onSwitch, onClose }) {
  return (
    <div>
      <h2>Register</h2>
      <button type="button" onClick={() => onSwitch('login')}>
        Go to Login
      </button>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

function LogoutContent({ onClose }) {
  return (
    <div>
      <h2>Log out?</h2>
      <p>Are you sure you want to log out?</p>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
      <button
        type="button"
        onClick={() => {
          console.log('Logged out!');
          onClose();
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default function ModalRoot() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen);
  const type = useSelector(selectModalType);
  const props = useSelector(selectModalProps);

  const onClose = () => dispatch(closeModal());
  const onSwitch = type => dispatch(setModalType(type));

  let content = null;
  if (type === 'login') content = <LoginContent onSwitch={onSwitch} onClose={onClose} {...props} />;
  if (type === 'register')
    content = <RegisterContent onSwitch={onSwitch} onClose={onClose} {...props} />;
  if (type === 'logout') content = <LogoutContent onClose={onClose} {...props} />;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {content}
    </Modal>
  );
}
