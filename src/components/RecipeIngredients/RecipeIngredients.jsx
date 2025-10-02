import Subtitle from '../Subtitle/Subtitle';
import css from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients = [] }) => {
  if (!ingredients.length || ingredients.length === 0) {
    return null;
  }

  return (
    <div className={css.ingredients}>
      <Subtitle className={css.title}>Ingredients:</Subtitle>
      <ul className={css['ingredients-list']}>
        {ingredients.map(ingredient => (
          <li
            key={`ingredient-${ingredient.id}-${ingredient.name}`}
            className={css['ingredients-item']}
          >
            <img
              src={ingredient.img || '/images/fallback-ingredient.png'}
              alt={ingredient.name}
              className={css['ingredients-img']}
            />
            <div>
              <p className={css['ingredients-name']}>{ingredient.name}</p>
              <p className={css['ingredients-measure']}>{ingredient.recipeIngredient.measure}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;
