import PopularRecipes from '../../components/PopularRecipes/PopularRecipes.jsx';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo.jsx';

const RecipePage = () => {
  return (
    <section className="f-container">
      <RecipeInfo />
      <PopularRecipes />
    </section>
  );
};

export default RecipePage;
