import { openModal } from '../../../redux/ui/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectToken } from '../../../redux/auth/selectors';
import { uploadAvatar } from '../../../redux/user/operations';
import styles from './UserInfo.module.css';
import Plus from '../../../assets/heroIMG/plus.svg';

export default function UserInfo({ isOwnProfile }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const handleLogoutClickBtn = () => {
    dispatch(openModal('logout'));
  };

  const handleChangeAvatar = e => {
    const selectedFile = e.target.files[0];
    dispatch(uploadAvatar({ file: selectedFile, token }));
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarBox}>
              <img src={`${user.avatar}`} alt="Avatar" className={styles.avatar} />
            </div>
            <label htmlFor="fileInput" className={styles.uploadButton}>
              <div className={styles.boxIcon}>
                <img src={`${Plus}`} alt="Icon" width={16} />
              </div>
            </label>
            <input
              className={styles.input}
              type="file"
              id="fileInput"
              onChange={handleChangeAvatar}
            />
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
              Added Recipes:<span className={styles.textValueProfile}>{user.recipesAmount}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Favorites:
              <span className={styles.textValueProfile}>{user.favoriteRecipesAmount}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Followers:<span className={styles.textValueProfile}>{user.followersAmount}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Following:<span className={styles.textValueProfile}>{user.followingsAmount}</span>
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
