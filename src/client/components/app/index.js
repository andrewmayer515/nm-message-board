import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './index.scss';
import MessageContainer from '../message-container';
import Login from '../login';
import { urlPrefix, tokenKey } from '../../constants';

const App = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');

  const logout = () => {
    Cookies.remove(tokenKey);
    setValidated(false);
    setUsername('');
  };

  const validateToken = async () => {
    const token = Cookies.get(tokenKey);
    const response = await fetch(`${urlPrefix}/verifyToken`, {
      method: 'POST',
      body: JSON.stringify({
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const body = await response.json();
      setValidated(true);
      setUsername(body.username);
    }
  };

  const isValidated = name => {
    setValidated(true);
    setUsername(name);
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div className="App">
      {validated ? (
        <MessageContainer username={username} logout={logout} />
      ) : (
        <Login isValidated={isValidated} />
      )}
    </div>
  );
};

export default App;
