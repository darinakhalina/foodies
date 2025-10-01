import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectIsLoggedIn } from '../../redux/auth/selectors';
import { openModal } from '../../redux/ui/modalSlice';
import css from './UserBar.module.css';

const UserBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  const handleLogoutClick = useCallback(() => {
    setIsOpen(false);
    dispatch(openModal('logout'));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target ?? null)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className={css['user-bar-holder']} ref={dropdownRef}>
      <button type="button" className={css['profile-button']} onClick={toggleDropdown}>
        {user.avatar ? (
          <img src={user.avatar} alt="User avatar" className={css.avatar} />
        ) : (
          <div className={css['fallback-avatar']}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <span className={css.username}>{user.name || 'User'}</span>
        <svg className={clsx(css.icon, { [css['is-opened']]: isOpen })}>
          <use href={'/images/icons.svg#icon-chevron-down'} />
        </svg>
      </button>
      <ul
        className={clsx(css['dropdown-menu'], {
          [css['is-visible']]: isOpen,
        })}
      >
        <li>
          <Link
            className={css['dropdown-menu-link']}
            to={`user/${user.id}`}
            onClick={close}
            viewTransition
          >
            Profile
          </Link>
        </li>
        <li>
          <button type="button" className={css['dropdown-menu-button']} onClick={handleLogoutClick}>
            Log Out
            <svg className={css['dropdown-menu-button-icon']}>
              <use href="/images/icons.svg#icon-arrow-up-right" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserBar;
