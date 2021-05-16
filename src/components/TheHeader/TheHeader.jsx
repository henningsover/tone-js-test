import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { SynthContext } from '../../contexts/SynthContextProvider'

import * as S from './styled'

export default function TheHeader() {

  const { toggleUpdateUserModal, logout } = useContext(AuthContext)
  const { toggleTutorialModal } = useContext(SynthContext)


  return (
    <S.TheHeader>
      <div>
        <S.Heading>MasterThesisTracker</S.Heading>
      </div>
      <S.ButtonsContainer>
        <S.HeaderButton onClick={ toggleUpdateUserModal }>Account</S.HeaderButton>
        <S.HeaderButton onClick={ toggleTutorialModal }>Tutorial</S.HeaderButton>
        <S.HeaderButton onClick={ logout }>Log Out</S.HeaderButton>
      </S.ButtonsContainer>
    </S.TheHeader>
  )
}
