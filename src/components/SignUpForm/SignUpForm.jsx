import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './SignUpForm.module.css';

export default function SignUpForm() {
  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // TODO: Implement signup logic
    console.log('SignUp form submitted:', values);
    setSubmitting(false);
  };

  return (
    <div className={styles.formWrapper}>
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
              showPasswordToggle={true}
              errors={errors}
              touched={touched}
            />

            <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
