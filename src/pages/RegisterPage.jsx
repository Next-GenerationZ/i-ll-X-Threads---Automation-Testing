/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaComments } from 'react-icons/fa';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ email, name, password }));
    navigate('/');
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <div className="text-center">
          <h1>
            <FaComments />
            {' '}
            I'll - X - Thread
          </h1>
        </div>
      </header>
      <article className="register-page__main">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />

        <p>
          Already have an account?
          {' '}
          <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
