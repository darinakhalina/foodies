import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchRecipeById } from '../../api/recipesApi';
import Subtitle from '../../components/Subtitle/Subtitle';
import { useParams } from 'react-router-dom';
import PathInfo from '../../components/PathInfo/PathInfo';
import Loader from '../../components/Loader/Loader.jsx';
import PopularRecipes from '../../components/PopularRecipes/PopularRecipes.jsx';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

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

  console.log('recipe', recipe);

  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>RecipePage</Subtitle>
      <p> id - {id}</p>
      <div>
        <PathInfo
          pages={[
            { name: 'Home', path: '/' },
            { name: 'Recipe Page', path: `/recipe/${id}` },
          ]}
        />
      </div>
      <PopularRecipes />
    </section>
  );
};

export default RecipePage;
