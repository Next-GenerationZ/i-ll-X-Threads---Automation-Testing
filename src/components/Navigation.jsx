import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const { name } = authUser;

  return (
    <div className="navigation">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          name,
        )}&background=random`}
        alt={name}
        title={name}
      />
      <nav>
        <Link to="/">{name}</Link>
      </nav>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
