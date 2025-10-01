import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  selectIsModalOpen,
  selectModalType,
  setModalType,
  selectModalProps,
} from '../../redux/ui/modalSlice';
import Modal from '../Modal/Modal';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import LogOutModal from '../LogOutModal/LogOutModal';

export default function ModalRoot() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen);
  const type = useSelector(selectModalType);
  const props = useSelector(selectModalProps);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const onClose = () => dispatch(closeModal());
  const switchType = newType => dispatch(setModalType(newType));

  useEffect(() => {
    if (isLoggedIn && isOpen && (type === 'login' || type === 'register')) {
      dispatch(closeModal());
    }
  }, [isLoggedIn, isOpen, type, dispatch]);

  let content = null;
  if (type === 'login')
    content = (
      <SignInModal onSuccess={onClose} onSwitch={() => switchType('register')} {...props} />
    );
  if (type === 'register')
    content = <SignUpModal onSuccess={onClose} onSwitch={() => switchType('login')} {...props} />;
  if (type === 'logout') content = <LogOutModal onClose={onClose} {...props} />;

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {content}
    </Modal>
  );
}
