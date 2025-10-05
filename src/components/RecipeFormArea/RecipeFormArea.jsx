import { useEffect } from 'react';
import InputContainer from '../InputContainer/InputContainer';
import Select from '../Select/Select';
import { useSelector, useDispatch } from 'react-redux';
import { selectAreas } from '../../redux/areas/selectors';
import { getAreas } from '../../redux/areas/operations';
import css from './RecipeFormArea.module.css';

const RecipeFormArea = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAreas());
  }, [dispatch]);

  const areas = useSelector(selectAreas);
  return (
    <InputContainer lable="area" id="area">
      <Select id="area" name="area" items={areas} placeholder="Area" className={css.area} />
    </InputContainer>
  );
};

export default RecipeFormArea;
