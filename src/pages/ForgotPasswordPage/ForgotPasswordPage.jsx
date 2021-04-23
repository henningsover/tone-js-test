import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContextProvider';

export default function ForgotPasswordPage() {
  const { resetPassword } = useContext(AuthContext);


  const [email, setEmail] = useState('');
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(email)
      setMessage('Check you email for further instructions')

    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <span>{error}</span>}
      {message && <span>{message}</span>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
        <button disabled={loading} type="submit">Reset Password</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}