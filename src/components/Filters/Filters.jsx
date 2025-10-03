import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../Dropdown/Dropdown';
import css from './Filters.module.css';
import { selectArea, selectIngredient } from '../../redux/filters/selectors';
import {
  setArea as setAreaFilter,
  setIngredient as setIngredientFilter,
} from '../../redux/filters/slice';
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
  const rootRef = useRef(null);

  const [openWhich, setOpenWhich] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) {
        setOpenWhich(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
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
    setOpenWhich(null); 
  };
  const handleIngredientChange = (val) => {
    if (onIngredient) onIngredient(val);
    else dispatch(setIngredientFilter(val));
    setOpenWhich(null); 
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
    <div className={css.filters} ref={rootRef}>
      <Dropdown
        options={ingredientOptions}
        placeholder="Ingredients"
        value={effectiveIngredient}
        onChange={(opt) => handleIngredientChange(opt.value)}
        availableOptions={availableIngredients}
        isOpen={openWhich === 'ingredient'}
        onOpenChange={(next) => setOpenWhich(next ? 'ingredient' : null)}
        onBeforeOpen={() => setOpenWhich('ingredient')}
      />
      <Dropdown
        options={areaOptions}
        placeholder="Area"
        value={effectiveArea}
        onChange={(opt) => handleAreaChange(opt.value)}
        availableOptions={availableAreas}
        isOpen={openWhich === 'area'}
        onOpenChange={(next) => setOpenWhich(next ? 'area' : null)}
        onBeforeOpen={() => setOpenWhich('area')}
      />
    </div>
  );
};
export default Filters;