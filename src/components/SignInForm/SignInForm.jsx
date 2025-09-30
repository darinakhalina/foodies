import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { selectIsLoggedIn, selectUserError } from '../../redux/auth/selectors';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './SignInForm.module.css';

const SignInForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectUserError);

  // eslint-disable-next-line no-useless-escape
  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validationSchema = Yup.object({
    email: Yup.string().matches(emailRegexp, 'Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success('Welcome back!');
    } catch (err) {
      toast.error(err?.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && onSuccess) {
      onSuccess();
    }
  }, [isLoggedIn, onSuccess]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Input
            name="email"
            type="email"
            placeholder="Email*"
            required
            errors={errors}
            touched={touched}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password*"
            required
            showPasswordToggle={true}
            errors={errors}
            touched={touched}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonWrapper}>
            <Button type="submit" className={styles.submitButton}>
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
