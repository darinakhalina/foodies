import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import {
  addToFavorites,
  getFavoriteRecipes,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import Button from '../Button/Button';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectIsFavorite, selectFavoritesLoading } from '../../redux/recipes/selectors';
import css from './RecipePreparation.module.css';
import { openModal } from "../../redux/ui/modalSlice.js";

const RecipePreparation = ({ recipe }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectFavoritesLoading);
  const isFavorite = useSelector(recipe?.id != null ? selectIsFavorite(recipe.id) : () => false);

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      dispatch(openModal('login'));
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.id));
    } else {
      dispatch(addToFavorites(recipe.id));
    }
  };

  const paragraphs = useMemo(() => {
    const raw = recipe?.instructions ?? '';

    const normalized = raw.replace(/<br\s*\/?>/gi, '\n').replace(/\r\n/g, '\n');

    return normalized
      .split(/\n\s*\n+/)
      .map(p => p.trim())
      .filter(Boolean);
  }, [recipe?.instructions]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavoriteRecipes());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>RECIPE PREPARATION</h3>
      {paragraphs.map((text, idx) => (
        <p key={idx} className={css.instructions}>
          {text}
        </p>
      ))}
      <div className={css.actions}>
        <Button
          variant="secondary"
          isLoading={isLoading}
          isDisabled={isLoading}
          className={css.action}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </Button>
      </div>
    </div>
  );
};

export default RecipePreparation;
