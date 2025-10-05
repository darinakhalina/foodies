import { useField } from 'formik';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import css from './Select.module.css';
import icons from '/images/icons.svg';
const Select = ({ name, items, placeholder, className = '' }) => {
  const [field, , helpers] = useField(name);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = e => {
      if (!e.target.closest(`.${css['input-wrapper']}`)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = id => {
    helpers.setValue(id);
    setOpen(false);
  };

  return (
    <div className={css['input-wrapper']}>
      <div className={clsx(css.input, className)} onClick={() => setOpen(prev => !prev)}>
        {field.value ? items.find(item => item.id === field.value)?.name : placeholder}
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
        <div className={css['dropdown-content']} role="listbox">
          <ul className={css['list-wrapper']}>
            {items.map((item, index) => (
              <li key={index} onClick={() => handleSelect(item.id)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
