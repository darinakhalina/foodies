import { useEffect } from 'react';
import { FieldArray } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { getIngredients } from '../../redux/ingredients/operations';
import Button from '../Button/Button';
import InputContainer from '../InputContainer/InputContainer';
import Select from '../Select/Select';
import Textarea from '../Textarea/Textarea';
import css from './RecipeFormIngredients.module.css';
import Ingredient from '../Ingredient/Ingredient.jsx';
import IngredientsList from '../IngredientsList/IngredientsList.jsx';

const getIngredient = (ingredients, id) => {
  const found = ingredients.find(item => item.id === id);
  return found || {};
};

const RecipeFormIngredients = ({ values }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredientItems = useSelector(selectIngredients);

  return (
    <InputContainer lable="ingredients" id="ingredients">
      <FieldArray name="ingredients">
        {({ insert, remove }) => (
          <>
            <div className={css['add-panel']}>
              <div className={css['add-field']}>
                <Select
                  name={`ingredients.${0}.id`}
                  items={ingredientItems}
                  placeholder="Add the ingredient"
                  className={css['add-ingredient']}
                />
              </div>
              <div className={css['add-field']}>
                <Textarea
                  name={`ingredients.${0}.quantity`}
                  placeholder="Enter quantity"
                  maxLength={50}
                  counter={false}
                  className={css['add-quantity']}
                />
              </div>

              <Button
                variant="secondary"
                className={css['add-button']}
                onClick={() => insert(0, { id: '', quantity: '' })}
              >
                Add Ingredient
                <svg className={css.icon}>
                  <use href="/images/icons.svg#icon-plus" />
                </svg>
              </Button>
            </div>
            {values.ingredients.length > 0 ? (
              <IngredientsList>
                {values.ingredients.map((ingredient, index) =>
                  index > 0 ? (
                    <Ingredient
                      image={getIngredient(ingredientItems, ingredient.id).img}
                      name={getIngredient(ingredientItems, ingredient.id).name}
                      measure={ingredient.quantity}
                      onClick={() => remove(index)}
                      key={index}
                    />
                  ) : null
                )}
              </IngredientsList>
            ) : null}
          </>
        )}
      </FieldArray>
    </InputContainer>
  );
};

export default RecipeFormIngredients;
