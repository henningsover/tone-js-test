import React, { useState, useContext, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm';
import LoginForm from '../../components/LoginForm';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  const [alreadyUser, setAlreadyUser] = useState(true);

  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const toggle = () => {
    setAlreadyUser(!alreadyUser);
  };

  useEffect(() => {
    if (currentUser) {
      history.push('/tracker');
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Login</h1>
      {alreadyUser ? <LoginForm /> : <SignUpForm />}
      <button onClick={toggle}>{alreadyUser ? 'Not a member?' : 'Sign in'}</button>
    </div>
  );
}
