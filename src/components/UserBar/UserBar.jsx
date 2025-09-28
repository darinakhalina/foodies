import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './UserBar.module.css';

const mockCurrentUser = {
  id: '123456789',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatar: 'https://placehold.co/64x64',
};

const UserBar = () => {
  const user = mockCurrentUser;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleLogoutClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target ?? null)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
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
