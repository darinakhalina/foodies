import Subtitle from '../Subtitle/Subtitle';
import css from './RecipeIngredients.module.css';
import Ingredient from '../Ingredient/Ingredient.jsx';
import IngredientsList from '../IngredientsList/IngredientsList.jsx';

const RecipeIngredients = ({ ingredients = [] }) => {
  if (!ingredients.length || ingredients.length === 0) {
    return null;
  }

  return (
    <div className={css.ingredients}>
      <Subtitle className={css.title}>Ingredients:</Subtitle>
      <IngredientsList>
        {ingredients.map((ingredient, index) => (
          <Ingredient
            image={ingredient.img}
            name={ingredient.name}
            measure={ingredient.measure}
            key={`ingredient-${index}-${ingredient.name}`}
          />
        ))}
      </IngredientsList>
    </div>
  );
};

export default RecipeIngredients;
