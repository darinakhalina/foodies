import ButtonIcon from '../ButtonIcon/ButtonIcon';
import css from './RecipeFormCooking.module.css';
import InputContainer from '../InputContainer/InputContainer';
import Select from '../Select/Select';

const categories = [
  { value: 'Seafood', name: 'Seafood' },
  { value: 'Seafood1', name: 'Seafood1' },
  { value: 'Seafood2', name: 'Seafood2' },
];

const RecipeFormCooking = ({ setFieldValue, values }) => {
  return (
    <div className={css.cooking}>
      <InputContainer lable="category" id="category">
        <Select
          id="category"
          name="category"
          items={categories}
          placeholder="Category"
          className={css.category}
        />
      </InputContainer>
      <InputContainer lable="cooking time" id="time">
        <div className={css.time}>
          <ButtonIcon
            iconName="icon-minus"
            variant="secondary"
            size="lg"
            onClick={() => setFieldValue('cookingTime', Math.max(1, values.cookingTime - 5))}
          />
          <span>{values.cookingTime} min</span>
          <ButtonIcon
            iconName="icon-plus"
            variant="secondary"
            size="lg"
            onClick={() => setFieldValue('cookingTime', values.cookingTime + 5)}
          />
        </div>
      </InputContainer>
    </div>
  );
};

export default RecipeFormCooking;
