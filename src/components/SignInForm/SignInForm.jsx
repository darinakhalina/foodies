import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './SignInForm.module.css';

const SignInForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // TODO: Implement signin logic
    console.log('SignIn form submitted:', values);
    setSubmitting(false);
  };

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
