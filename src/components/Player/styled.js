import styled from 'styled-components'

export const PlayerWrapper = styled.div`
  background: #5f8999;
  width: 100vw;
  text-align: center;
  padding: 40px 20px;
`

export const Heading = styled.h1`
  text-align: center;
  letter-spacing: 10px;
  margin-bottom: 30px;
  font-size: 25px;
  color: aliceblue;
`

export const Player = styled.div`
  width: 100%;
`

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const PlayerButton = styled.button`
  width: 50%;
  height: 100px;
  font-size: 20px;
  background-color: aliceblue;
  color: black;
  border: 5px solid #5f8999;

  &:hover {
    border-color: #070b42;
  }

  &:active {
    background-color: #d8dfe6;
  }
`