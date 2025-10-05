import styles from './Dropdown.module.css';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import icons from '/images/icons.svg';

export const Dropdown = ({
  options = [],
  placeholder = 'Select an option',
  value = '',
  onChange,
  availableOptions,
  isOpen: controlledOpen,
  onOpenChange,
  onBeforeOpen,
}) => {
  const isControlled = typeof controlledOpen === 'boolean';
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = next => {
    if (isControlled) {
      onOpenChange?.(next);
    } else {
      setInternalOpen(next);
    }
  };
  const selected = useMemo(
    () => options.find(opt => opt.value === value) || null,
    [options, value]
  );
  const toggleOpen = () => {
    if (!open) {
      onBeforeOpen?.();
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleSelect = option => {
    onChange?.(option);
    setOpen(false);
  };
  return (
    <div className={styles.wrapper}>
      <button className={styles.toggle} onClick={toggleOpen} type="button" aria-expanded={open}>
        <div>{selected ? selected.searchLabel || selected.label : placeholder}</div>
        <svg
          className={clsx(styles.icon, open && styles.rotate)}
          width="18"
          height="18"
          aria-hidden="true"
        >
          <use href={`${icons}#icon-arrow-down`} />
        </svg>
      </button>
      {open && (
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
