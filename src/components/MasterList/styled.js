import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media(min-width:930px) {
    width: unset;
  }

  @media(min-width: 1115px) {
    min-width: unset;
    width: 50%;
  }
`

export const MasterListWrapper = styled.div`
  height: 90px;
  flex-grow: 1;
  padding: 5px;
  border: 1px solid black;
  
  @media(min-width:930px) {
    padding: 5px 20px;
  }

  @media(min-width: 1010px) {
    padding: 5px;
  }
`

export const MasterList = styled.ol`
  list-style: none;
  height: 80px;
  max-height: 80px;
  overflow: scroll;

  @media(min-width: 1010px) {
    height: 100px;
    max-height: 100px;
  }

  @media(min-width: 1115px) {
    max-height: 110px;
    height: unset;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  border: 1px solid black;
  padding: 5px;
`

export const MasterListButton = styled.button`
  margin: 0 5px;
  padding: 0 10px;
  background-color: aliceblue;
  color: black;
  border: 3px solid #5f8999;

  &:hover {
    border-color: #070b42;
  }

  &:active {
    background-color: #d8dfe6;
  }
`