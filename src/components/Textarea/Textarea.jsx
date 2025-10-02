import { useRef } from 'react';
import { Field, useFormikContext } from 'formik';
import clsx from 'clsx';
import css from './Textarea.module.css';

const Textarea = ({ name, placeholder, maxLength = 1000, counter = true, className = '' }) => {
  const textareaRef = useRef(null);
  const { values } = useFormikContext();
  const text = values?.[name] || '';

  const handleChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className={css.container}>
      <Field
        innerRef={textareaRef}
        id={`id-${name}`}
        as="textarea"
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
        className={clsx(css.textarea, className)}
        onInput={handleChange}
      />
      {counter && (
        <p className={css.counter}>
          <span className={clsx(text.length > 0 && css.accent)}>{text.length}</span>/{maxLength}
        </p>
      )}
    </div>
  );
};

export default Textarea;
