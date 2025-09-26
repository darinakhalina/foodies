import css from './Filters.module.css';

const SelectField = ({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <label className={css.field} htmlFor={id}>
      <span className={css.label}>{label}</span>

      <span className={css.selectWrap}>
        <select
          id={id}
          className={css.select}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={label}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
};

const Filters = ({
  areas,
  ingredients,
  selectedArea,
  selectedIngredient,
  onArea,
  onIngredient,
}) => {
  return (
    <div className={css.filters}>
      <SelectField
        id="ingredients"
        placeholder="Ingredients"
        value={selectedIngredient}
        options={ingredients}
        onChange={onIngredient}
      />
      <SelectField
        id="area"
        placeholder="Area"
        value={selectedArea}
        options={areas}
        onChange={onArea}
      />
    </div>
  );
};

export default Filters;
