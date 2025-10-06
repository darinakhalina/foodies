import styles from './Message.module.css';
import clsx from 'clsx';

export default function Message({ children, className }) {
  return <p className={clsx(styles.message, className)}>{children}</p>;
}