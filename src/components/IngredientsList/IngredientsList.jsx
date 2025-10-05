import css from '../RecipeIngredients/RecipeIngredients.module.css';

const IngredientsList = ({ children }) => {
  return <ul className={css['ingredients-list']}>{children}</ul>;
};

export default IngredientsList;
