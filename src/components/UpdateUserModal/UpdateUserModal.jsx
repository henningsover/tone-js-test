import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider';
import * as S from './styled'

import BaseModal from '../common/BaseModal'


export default function UpdateUserModal() {

  const {
    toggleUpdateUserModal,
    currentUser,
    updateUsername,
    updatePassword
  } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match')
    }

    const promises = []
    setLoading(true)
    setError('')

    if (username.trim() !== currentUser.displayName && username.trim() !== '') {
      promises.push(updateUsername(username))
    }

    if (password.trim() !== '') {
      promises.push(updatePassword(password))
    }

    Promise.all(promises).then(() => {
      setMessage('Profile updated')
    }).catch(() => {
      setError('Failed to update')
    }).finally(()=> {
      setLoading(false)
    })

  };

  return (
    <BaseModal toggleModal={toggleUpdateUserModal} size="small">
      <S.Header>
        <S.Heading>Manage account</S.Heading>
      </S.Header>
      <S.FormWrapper>
        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
        {message && <S.Msg>{message}</S.Msg>}
        <S.AuthForm onSubmit={(e) => handleSubmit(e)}>
          <S.AuthLabel htmlFor="username">Username</S.AuthLabel>
          <S.AuthInput
            placeholder={currentUser.displayName ? currentUser.displayName : "Username"}
            name="username"
            value={username}
            required
            onChange={(e) => handleUsernameChange(e)} />

          <S.AuthLabel htmlFor="password">Password</S.AuthLabel>
          <S.AuthInput
            name="password"
            type="password"
            placeholder="Leave blank to keep the same"
            value={password}
            onChange={(e) => handlePasswordChange(e)} />

            <S.AuthLabel htmlFor="passwordConfirm">Confirm Password</S.AuthLabel>
            <S.AuthInput
              name="passwordConfirm"
              type="password"
              placeholder="Leave blank to keep the same"
              value={passwordConfirm}
              onChange={(e) => handlePasswordConfirmChange(e)}
            />
          <S.SubmitButton disabled={loading} type="submit">Update</S.SubmitButton>
        </S.AuthForm>
      </S.FormWrapper>
    </BaseModal>
  )
}
