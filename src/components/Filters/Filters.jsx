import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../Dropdown/Dropdown';
import css from './Filters.module.css';

import { selectArea, selectIngredient } from '../../redux/test/filters/selectors';
import {
  setArea as setAreaFilter,
  setIngredient as setIngredientFilter,
} from '../../redux/test/filters/slice';

const Filters = ({
  areas = [],
  ingredients = [],
  selectedArea,
  selectedIngredient,
  onArea,
  onIngredient,
  availableAreas,
  availableIngredients,
}) => {
  const dispatch = useDispatch();

  const areaFromRedux = useSelector(selectArea);
  const ingredientFromRedux = useSelector(selectIngredient);

  const effectiveArea =
    typeof selectedArea !== 'undefined' ? selectedArea : areaFromRedux;
  const effectiveIngredient =
    typeof selectedIngredient !== 'undefined'
      ? selectedIngredient
      : ingredientFromRedux;

  const handleAreaChange = (val) => {
    if (onArea) onArea(val);
    else dispatch(setAreaFilter(val));
  };

  const handleIngredientChange = (val) => {
    if (onIngredient) onIngredient(val);
    else dispatch(setIngredientFilter(val));
  };

  const ingredientOptions = [
    { value: '', label: 'Ingredients' },
    ...ingredients.map((name) => ({ value: name, label: name })),
  ];

  const areaOptions = [
    { value: '', label: 'Area' },
    ...areas.map((name) => ({ value: name, label: name })),
  ];

  return (
    <div className={css.filters}>
      <Dropdown
        options={ingredientOptions}
        placeholder="Ingredients"
        value={effectiveIngredient}
        onChange={(opt) => handleIngredientChange(opt.value)}
        availableOptions={availableIngredients}
      />

      <Dropdown
        options={areaOptions}
        placeholder="Area"
        value={effectiveArea}
        onChange={(opt) => handleAreaChange(opt.value)}
        availableOptions={availableAreas}
      />
    </div>
  );
};

export default Filters;
