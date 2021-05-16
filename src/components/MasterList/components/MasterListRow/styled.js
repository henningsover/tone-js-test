import styled from 'styled-components'

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 20px;
`

export const MasterListInput = styled.input`
  width: 50%;

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