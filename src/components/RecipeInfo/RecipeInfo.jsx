import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchRecipeById } from '../../api/recipesApi';
import { useParams } from 'react-router-dom';
import PathInfo from '../../components/PathInfo/PathInfo';
import Loader from '../../components/Loader/Loader';
import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import css from './RecipeInfo.module.css';

const RecipeInfo = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // todo: check fetch test
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const recipeData = await fetchRecipeById(id);
        setRecipe(recipeData);
      } catch {
        toast.error('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!recipe) return null;

  return (
    <div className={css['section-holder']}>
      <PathInfo
        pages={[
          { name: 'Home', path: '/' },
          { name: `${recipe.title}`, path: `/recipe/${id}` },
        ]}
      />
      <div className={css.wrapper}>
        <div className={css.sidebar}>
          <div className={css['image-wrapper']}>
            <img src={recipe.thumb} alt={recipe.title} />
          </div>
        </div>
        <div className={css.content}>
          <RecipeMainInfo recipe={recipe} />
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipePreparation recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
