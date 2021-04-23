import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { firebaseCreateUser } from '../../firebase';

export default function SignUpPage() {
  const { signup, currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(email, password);
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)

  };

  useEffect(() => {
    if (currentUser) {
      firebaseCreateUser(currentUser.email, currentUser.uid);
      console.log('creating user');
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <span>{error}</span>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e)} />
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => handlePasswordConfirmChange(e)}
        />
        <button disabled={loading} type="submit">Sign up</button>
      </form>
      <Link to="/login">Already a member?</Link>
    </div>
  );
}
