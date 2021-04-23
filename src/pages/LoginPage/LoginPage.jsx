import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContextProvider';

export default function LoginPage() {
  const { login, currentUser } = useContext(AuthContext);

  const history = useHistory()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setError('')
      setLoading(true)
      await login(email, password)
      history.push('/')

    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  };

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Log In</h2>
      {error && <span>{error}</span>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e)} />
        <button disabled={loading} type="submit">Login</button>
      </form>
      <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      <Link to="/signup">Create account</Link>
    </div>
  );
}
