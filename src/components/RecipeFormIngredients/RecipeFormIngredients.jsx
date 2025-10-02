import { FieldArray } from 'formik';
import Button from '../Button/Button';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import InputContainer from '../InputContainer/InputContainer';
import Select from '../Select/Select';
import Textarea from '../Textarea/Textarea';
import css from './RecipeFormIngredients.module.css';

const ingredientItems = [
  { value: 'Salmon', name: 'Salmon' },
  { value: 'Avocado', name: 'Avocado' },
  { value: 'Mint', name: 'Mint' },
];

const RecipeFormIngredients = ({ values }) => {
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

            <ul className={css['all-igredients']}>
              {values.ingredients.length > 0 &&
                values.ingredients.map((ingredient, index) => (
                  <>
                    {index !== 0 && (
                      <li className={css['ingredient-card']} key={index}>
                        <img
                          src="http://localhost:5173/images/test-cake.png"
                          alt="ingredient.id"
                          width="50"
                          height="50"
                        ></img>
                        <div>
                          <p name={`ingredients.${index}.id`}>{ingredient.id}</p>
                          <span name={`ingredients.${index}.quantity`}>{ingredient.quantity}</span>
                        </div>
                        <ButtonIcon
                          iconName="icon-plus"
                          variant="secondary"
                          size="sm"
                          className={css.rotate}
                          onClick={() => remove(index)}
                        />
                      </li>
                    )}
                  </>
                ))}
            </ul>
          </>
        )}
      </FieldArray>
    </InputContainer>
  );
};

export default RecipeFormIngredients;
