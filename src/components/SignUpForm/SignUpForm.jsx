import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../../redux/auth/operations';
import { selectUserError } from '../../redux/auth/selectors';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './SignUpForm.module.css';

const SignUpForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);

  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    email: Yup.string().matches(emailRegexp, 'Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(register(values)).unwrap();
      await dispatch(login({ email: values.email, password: values.password })).unwrap();
      toast.success('Registration successful!');
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : err?.message;

      if (errorMessage?.includes('exists')) {
        toast.error('User already exists!');
      } else {
        toast.error(errorMessage || 'Registration failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form}>
          <Input name="name" placeholder="Name*" required errors={errors} touched={touched} />
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
            showPasswordToggle
            errors={errors}
            touched={touched}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
