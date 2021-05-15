import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContextProvider';

import * as S from '../../components/common/styles/AuthStyles'

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
    <S.PageContainer>
      <S.ContentWrapper>
        <S.CardWrapper>
          <S.Heading>MasterThesisTracker</S.Heading>
          <S.AuthHeading>Reset Password</S.AuthHeading>
          {error && <span>{error}</span>}
          {message && <span>{message}</span>}
          <S.AuthForm onSubmit={(e) => handleSubmit(e)}>
            <S.AuthInput type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
            <S.SubmitButton disabled={loading} type="submit">Reset Password</S.SubmitButton>
          </S.AuthForm>
        </S.CardWrapper>
        <S.LinksWrapper>
          <Link to="/login">Login</Link>
        </S.LinksWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
}