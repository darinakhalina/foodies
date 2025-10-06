import { useEffect, useState } from 'react';
import { FieldArray, useField } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { getIngredients } from '../../redux/ingredients/operations';
import Button from '../Button/Button';
import InputContainer from '../InputContainer/InputContainer';
import Select from '../Select/Select';
import Textarea from '../Textarea/Textarea';
import css from './RecipeFormIngredients.module.css';
import clsx from 'clsx';
import Ingredient from '../Ingredient/Ingredient.jsx';
import IngredientsList from '../IngredientsList/IngredientsList.jsx';

const getIngredient = (ingredients, id) => {
  const found = ingredients.find(item => item.id === id);
  return found || {};
};

const RecipeFormIngredients = ({ values }) => {
  const [, meta] = useField('ingredients');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const [isError, setIsError] = useState(false);
  const ingredientItems = useSelector(selectIngredients);

  return (
    <InputContainer lable="ingredients" id="ingredients">
      <FieldArray name="ingredients">
        {({ insert, remove }) => (
          <>
            <div className={css['add-panel']}>
              <div className={css['add-holder']}>
                <div className={css['add-field']}>
                  <Select
                    name={`ingredients.${0}.id`}
                    items={ingredientItems}
                    placeholder="Add the ingredient"
                    className={clsx(
                      css['add-ingredient'],
                      isError && !values.ingredients[0].id && css['input-error']
                    )}
                  />
                </div>
                <div className={css['add-field']}>
                  <Textarea
                    name={`ingredients.${0}.quantity`}
                    placeholder="Enter quantity"
                    maxLength={50}
                    counter={false}
                    className={clsx(css['add-quantity'], isError && css['input-error'])}
                  />
                </div>
              </div>

              <Button
                variant="secondary"
                className={css['add-button']}
                onClick={() => {
                  if (values.ingredients[0]?.id && values.ingredients[0]?.quantity?.trim() !== '') {
                    insert(0, { id: '', quantity: '' });
                    setIsError(false);
                  } else {
                    setIsError(true);
                  }
                }}
              >
                Add Ingredient
                <svg className={css.icon}>
                  <use href="/images/icons.svg#icon-plus" />
                </svg>
              </Button>
              {meta.touched && meta.error && <div className={css.error}>{meta.error}</div>}
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
