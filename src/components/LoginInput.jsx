import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginInput({ login }) {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => login(values)}
    >
      {({ isSubmitting }) => (
        <Form className="login-input">
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
          <button type="submit" disabled={isSubmitting}>Login</button>
        </Form>
      )}
    </Formik>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
