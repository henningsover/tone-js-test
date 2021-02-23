import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';

export default function LoginForm() {
  const { login, currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
    }
  }, [currentUser]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e)} />
      <button type="submit">Login</button>
    </form>
  );
}
