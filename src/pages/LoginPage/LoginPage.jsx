import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContextProvider';

import * as S from '../../components/common/styles/AuthStyles'

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

  return (
    <S.PageContainer>
      <S.ContentWrapper>
        <S.CardWrapper>
          <S.Heading>MasterThesisTracker</S.Heading>
          <S.AuthHeading>Login</S.AuthHeading>
          {error && <span>{error}</span>}
          <S.AuthForm onSubmit={(e) => handleSubmit(e)}>
            <S.AuthInput type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
            <S.AuthInput type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e)} />
            <S.SubmitButton disabled={loading} type="submit">Login</S.SubmitButton>
          </S.AuthForm>
        </S.CardWrapper>
        <S.LinksWrapper>
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/signup">Create account</Link>
        </S.LinksWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
}
