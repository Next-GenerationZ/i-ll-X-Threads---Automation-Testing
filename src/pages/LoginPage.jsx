/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <div className="text-center">
          <h1>
            <FaComments />
            I'll - X - Thread
          </h1>
        </div>
      </header>
      <article className="login-page__main">
        <h2>
          Explore
          {' '}
          <strong>Threads</strong>
          ,
          {' '}
          <br />
          Through Open Conversations.
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
