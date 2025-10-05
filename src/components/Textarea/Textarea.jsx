import { useRef, useLayoutEffect } from 'react';
import { Field, useFormikContext, useField } from 'formik';
import clsx from 'clsx';
import css from './Textarea.module.css';

const Textarea = ({ name, placeholder, maxLength = 1000, counter = true, className = '' }) => {
  const textareaRef = useRef(null);
  const [field, meta] = useField(name);
  const { values } = useFormikContext();
  const text = values?.[name] || '';

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      const lineHeight = window.getComputedStyle(textareaRef.current).lineHeight;
      el.style.height = el.value ? el.scrollHeight + 'px' : lineHeight;
    }
  }, [field.value]);

  return (
    <div className={css.container}>
      <div className={css.field}>
        <Field
          innerRef={textareaRef}
          id={name}
          as="textarea"
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          className={clsx(
            css.textarea,
            meta.touched && meta.error && css['input-error'],
            className,
            css.new
          )}
        />
        {counter && (
          <p className={css.counter}>
            <span className={clsx(text.length > 0 && css.accent)}>{text.length}</span>/{maxLength}
          </p>
        )}
      </div>
      {meta.touched && meta.error && <div className={css.error}>{meta.error}</div>}
    </div>
  );
};

export default Textarea;
