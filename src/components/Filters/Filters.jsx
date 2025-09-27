import { Dropdown } from '../Dropdown/Dropdown';
import css from './Filters.module.css';

const Filters = ({
  areas = [],
  ingredients = [],
  selectedArea = '',
  selectedIngredient = '',
  onArea,
  onIngredient,
  availableAreas,
  availableIngredients,
}) => {
  const ingredientOptions = [
    { value: '', label: 'Ingredients' },
    ...ingredients.map(name => ({ value: name, label: name })),
  ];

  const areaOptions = [
    { value: '', label: 'Area' },
    ...areas.map(name => ({ value: name, label: name })),
  ];

  return (
    <div className={css.filters}>
      <Dropdown
        options={ingredientOptions}
        placeholder="Ingredients"
        value={selectedIngredient}
        onChange={(opt) => onIngredient(opt.value)}
        availableOptions={availableIngredients}
      />
      <Dropdown
        options={areaOptions}
        placeholder="Area"
        value={selectedArea}
        onChange={(opt) => onArea(opt.value)}
        availableOptions={availableAreas}
      />
    </div>
  );
};

export default Filters;
