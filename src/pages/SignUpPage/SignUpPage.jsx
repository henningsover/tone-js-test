import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { firebaseCreateUser } from '../../firebase';

import * as S from '../../components/common/styles/AuthStyles'

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
    <S.PageContainer>
      <S.ContentWrapper>
        <S.CardWrapper>
          <S.Heading>MasterThesisTracker</S.Heading>
          <S.AuthHeading>Sign Up</S.AuthHeading>
          {error && <span>{error}</span>}
          <S.AuthForm onSubmit={(e) => handleSubmit(e)}>
            <S.AuthInput type="email" placeholder="Email" value={email} onChange={(e) => handleEmailChange(e)} />
            <S.AuthInput type="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e)} />
            <S.AuthInput
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => handlePasswordConfirmChange(e)}
            />
            <S.SubmitButton disabled={loading} type="submit">Sign up</S.SubmitButton>
          </S.AuthForm>
        </S.CardWrapper>
        <S.LinksWrapper>
          <Link to="/login">Already a member?</Link>
        </S.LinksWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
}
