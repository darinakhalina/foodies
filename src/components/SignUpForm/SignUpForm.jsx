import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './SignUpForm.module.css';

const SignUpForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-useless-escape
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
      validateOnMount
    >
      {({ errors, touched, isSubmitting, isValid }) => (
        <Form className={styles.form} noValidate>
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
          <Button
            type="submit"
            className={styles.submitButton}
            isLoading={isSubmitting}
            isDisabled={!isValid || isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
