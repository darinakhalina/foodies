import toast from 'react-hot-toast';
import css from './PopularRecipes.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import { useEffect, useState } from 'react';
import { fetchPopularRecipes } from '../../api/recipesApi';
import Loader from '../../components/Loader/Loader.jsx';

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const recipesData = await fetchPopularRecipes();
        setRecipes(recipesData.recipes);
      } catch {
        toast.error('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section className={css.popular}>
      <h2>Popular recipes</h2>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {recipes?.map(el => (
            <li key={el.id}>
              <RecipeCard recipe={el} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PopularRecipes;
