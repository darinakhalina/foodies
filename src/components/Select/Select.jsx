import { useField } from 'formik';
import { useState } from 'react';
import clsx from 'clsx';
import css from './Select.module.css';
import icons from '/images/icons.svg';
const Select = ({ name, items, placeholder, className = '' }) => {
  const [field, , helpers] = useField(name);
  const [open, setOpen] = useState(false);

  const handleSelect = value => {
    helpers.setValue(value);
    setOpen(false);
  };

  return (
    <div className={css.inputWrapper}>
      <div className={clsx(css.input, className)} onClick={() => setOpen(prev => !prev)}>
        {field.value ? items.find(i => i.value === field.value)?.name : placeholder}
        <span className={css.arrow}>
          <svg
            className={clsx(css.icon, open && css.rotate)}
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use href={`${icons}#icon-arrow-down`} />
          </svg>
        </span>
      </div>

      {open && (
        <div className={css.dropdownContent}>
          {items.map((item, index) => (
            <div key={index} className={css.dropdownItem} onClick={() => handleSelect(item.value)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
