import { openModal } from '../../../redux/ui/modalSlice';
import { useDispatch } from 'react-redux';
import styles from './UserInfo.module.css';
import Plus from '../../../assets/heroIMG/plus.svg';
import Cat from '../../../../public/images/cat.png';

export default function UserInfo({ user, isOwnProfile }) {
  const dispatch = useDispatch();

  const handleLogoutClickBtn = () => {
    dispatch(openModal('logout'));
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarBox}>
              <img src={`${Cat}`} alt="Avatar" className={styles.avatar} />
            </div>
            <label htmlFor="fileInput" className={styles.uploadButton}>
              <div className={styles.boxIcon}>
                <img src={`${Plus}`} alt="Icon" width={16} />
              </div>
            </label>
            <input className={styles.input} type="file" id="fileInput" />
          </div>
          <p className={styles.name}>{user.name}</p>
        </div>

        <ul className={styles.stats}>
          <li>
            <p className={styles.textProfile}>
              Email:<span className={styles.textValueProfile}>{user.email}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Added Recipes:<span className={styles.textValueProfile}>{user.stats.recipes}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Favorites:<span className={styles.textValueProfile}>{user.stats.favorites}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Followers:<span className={styles.textValueProfile}>{user.stats.followers}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Following:<span className={styles.textValueProfile}>{user.stats.following}</span>
            </p>
          </li>
        </ul>
      </div>
      <button className={styles.logout} type="button" onClick={handleLogoutClickBtn}>
        {isOwnProfile ? 'LOG OUT' : 'MESSAGE'}
      </button>
    </div>
  );
}
