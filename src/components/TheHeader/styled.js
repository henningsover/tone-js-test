import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'

export const TheHeader = styled.header`
  position: absolute;
  height: 90px;
  background: #ffffff21;
  width: 100vw;
  color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  @media(min-width: 690px) {
    height: 60px;
    flex-direction: row;
  }

`

export const Heading = styled.h1`
  font-size: 15px;

  @media(min-width: 930px) {
    font-size: 25px;
  }
`

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media(min-width: 690px) {
    width: 400px;
  }
`

export const HeaderButton = styled.button`
  padding: 10px;
`

export const MenuButton = styled(GiHamburgerMenu)`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
    color: black;
`