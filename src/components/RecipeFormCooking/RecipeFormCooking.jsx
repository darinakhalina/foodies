import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategories } from '../../redux/categories/selectors';
import { getCategories } from '../../redux/categories/operations';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import css from './RecipeFormCooking.module.css';
import InputContainer from '../InputContainer/InputContainer';
import Select from '../Select/Select';

const RecipeFormCooking = ({ setFieldValue, values }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector(selectCategories);

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
