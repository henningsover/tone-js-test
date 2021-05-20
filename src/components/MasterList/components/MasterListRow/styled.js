import styled from 'styled-components'

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 20px;
  padding: 3px;
`

export const MasterListInput = styled.input`
  width: 50%;
  border-style: none;
  padding: 3px;
  background-color: aliceblue;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px #070b42;
    border-radius: 2px;
  }

  @media(min-width: 930px) {
    width: 75%;
  }
`

export const MasterListIndex = styled.span`
  width: 50%;

  @media(min-width: 1010px) {
    width: 25%;
  }
`