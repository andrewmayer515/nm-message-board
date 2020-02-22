import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import './index.scss';
import { tokenKey } from '../../constants';

const Login = props => {
  const inputRef = useRef(null);

  const login = async () => {
    const response = await fetch('/api/createToken', {
      method: 'POST',
      body: JSON.stringify({
        username: inputRef.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();

    Cookies.set(tokenKey, body.token);
    props.isValidated(inputRef.current.value);
  };

  return (
    <div className="login">
      <span>Username:</span>
      <input type="text" ref={inputRef}></input>
      <button onClick={login}>Login</button>
    </div>
  );
};

Login.propTypes = {
  isValidated: PropTypes.func.isRequired,
};

export default Login;
