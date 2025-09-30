import styles from './Dropdown.module.css';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import icons from '/images/icons.svg';

export const Dropdown = ({
  options = [],
  placeholder = 'Select an option',
  value = '',
  onChange,
  availableOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const selectedOption = options.find(opt => opt.value === value);
    setSelected(selectedOption || null);
  }, [value, options]);

  const handleSelect = option => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        <div>{selected ? selected.searchLabel || selected.label : placeholder}</div>

        {/* rotate the chevron when open */}
        <svg
          className={clsx(styles.icon, isOpen && styles.rotate)}
          width="18"
          height="18"
          aria-hidden="true"
        >
          <use href={`${icons}#icon-arrow-down`} />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map(opt => {
            const isAvailable =
              !availableOptions || !opt.value || availableOptions.includes(opt.value);
            return (
              <li
                key={opt.value}
                className={clsx(styles.item, !isAvailable && styles.disabled)}
                onClick={() => isAvailable && handleSelect(opt)}
                role="option"
                aria-disabled={!isAvailable}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
