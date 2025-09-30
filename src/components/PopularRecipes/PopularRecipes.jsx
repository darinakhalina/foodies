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
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={css.popular}>
      <h2>Popular recipes</h2>
      <ul>
        {recipes?.map(el => (
          <li key={el.id}>
            <RecipeCard data={el} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularRecipes;
