import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Subtitle from '../Subtitle/Subtitle';
import css from './RecipeMainInfo.module.css';
import { openModal } from '../../redux/ui/modalSlice.js';

const RecipeMainInfo = ({ recipe }) => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleOwnerClick = () => {
    if (isUserLoggedIn) {
      navigate(`/user/${recipe.owner.id}`);
    } else {
      dispatch(openModal('login'));
    }
  };

  return (
    <div>
      <Subtitle className={css.title}>{recipe.title}</Subtitle>
      <div className={css['tags-holder']}>
        <span className={css.tag}>{recipe.category?.name}</span>
        <span className={css.tag}>{`${recipe.time} min`}</span>
      </div>
      <p className={css.description}>{recipe.description}</p>
      <div className={css['owner-info']}>
        {recipe.owner && (
          <button className={css['owner-button']} onClick={handleOwnerClick}>
            <img src={recipe.owner?.avatar || '/images/fallback-avatar.png'} alt="Avatar" />
            <div className={css['owner-text']}>
              <span className={css['owner-label']}>Created by:</span>
              <p className={css['owner-name']}>{recipe.owner?.name}</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeMainInfo;
