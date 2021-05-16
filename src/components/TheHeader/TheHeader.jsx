import React from 'react'
import * as S from './styled'

export default function TheHeader({links}) {

  return (
    <S.TheHeader>
      <div>
        <S.Heading>MasterThesisTracker</S.Heading>
      </div>
      <S.ButtonsContainer>
        <S.HeaderButton>Manage Accout</S.HeaderButton>
        <S.HeaderButton>Tutorial</S.HeaderButton>
        <S.HeaderButton>Log Out</S.HeaderButton>
      </S.ButtonsContainer>
    </S.TheHeader>
  )
}
