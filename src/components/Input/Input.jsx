import { useId, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import icons from '/images/icons.svg';
import styles from './Input.module.css';

export default function Input({
  name,
  type = 'text',
  placeholder,
  required = false,
  showPasswordToggle = false,
  className = '',
  errors,
  touched,
  ...props
}) {
  const inputId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;
  const hasError = touched[name] && errors[name];

  return (
    <div className={styles.inputWithError}>
      <div className={styles.inputWrapper}>
        <Field
          id={inputId}
          name={name}
          type={inputType}
          required={required}
          placeholder={placeholder}
          className={`${styles.input} ${hasError ? styles.inputError : ''} ${className}`}
          data-password={isPasswordField ? 'true' : 'false'}
          {...props}
        />

        {isPasswordField && showPasswordToggle && (
          <button
            type="button"
            className={styles.eyeButton}
            aria-pressed={showPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(v => !v)}
          >
            <svg className={styles.eyeIcon} aria-hidden="true">
              <use href={`${icons}#${showPassword ? 'icon-eye-open' : 'icon-eye-close'}`} />
            </svg>
          </button>
        )}
      </div>

      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
}
