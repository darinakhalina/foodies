import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button.jsx';
import styles from './SignUpForm.module.css';

export default function SignUpForm() {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      //   onSubmit={}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.inputWithError}>
            <Field
              id={nameId}
              name="name"
              required
              placeholder="Name*"
              className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
            />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>

          <div className={styles.inputWithError}>
            <Field
              id={emailId}
              name="email"
              type="email"
              required
              placeholder="Email*"
              className={`${styles.input} ${
                touched.email && errors.email ? styles.inputError : ''
              }`}
            />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </div>

          <div className={styles.inputWithError}>
            <div className={styles.inputWrapper}>
              <Field
                id={passwordId}
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password*"
                className={`${styles.input} ${
                  touched.password && errors.password ? styles.inputError : ''
                }`}
              />
              {showPassword ? (
                <svg
                  className={styles.eyeIcon}
                  aria-hidden="true"
                  onClick={() => setShowPassword(false)}
                >
                  <use href="/images/icons.svg#icon-eye" />
                </svg>
              ) : (
                <svg
                  className={styles.eyeIcon}
                  aria-hidden="true"
                  onClick={() => setShowPassword(true)}
                >
                  <use href="/images/icons.svg#icon-eye-off" />
                </svg>
              )}
            </div>
            <ErrorMessage name="password" component="div" className={styles.error} />
          </div>

          <div className={styles.buttonWrapper}>
            <Button type="submit" className={styles.submitButton}>
              Create
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
