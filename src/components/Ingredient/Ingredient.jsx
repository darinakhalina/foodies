import css from '../RecipeIngredients/RecipeIngredients.module.css';

const Ingredient = ({ image, name, measure, onClick }) => {
  return (
    <li className={css['ingredients-item']}>
      <img
        src={image || '/images/fallback-ingredient.png'}
        alt={name}
        className={css['ingredients-img']}
      />
      <div>
        <p className={css['ingredients-name']}>{name}</p>
        {measure && <p className={css['ingredients-measure']}>{measure}</p>}
      </div>
      {onClick && (
        <button type="button" onClick={onClick} className={css['ingredient-btn']}>
          <svg className={css['close-icon']}>
            <use href="/images/icons.svg#icon-close" />
          </svg>
        </button>
      )}
    </li>
  );
};

export default Ingredient;
