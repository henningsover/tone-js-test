import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { firebaseCreateUser } from '../../firebase';

export default function SignUpForm() {
  const { signup, currentUser } = useContext(AuthContext);
  console.log(signup);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      signup(email, password);
    }
  };

  useEffect(() => {
    if (currentUser) {
      firebaseCreateUser(currentUser.email, currentUser.uid);
      console.log('creating user');
    }
  }, [currentUser]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e)} />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => handlePasswordConfirmChange(e)}
      />
      <button type="submit">Sign up</button>
    </form>
  );
}
