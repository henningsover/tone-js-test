import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

export const MasterListWrapper = styled.div`
  height: 90px;
  flex-grow: 1;
  padding: 5px;
  border: 1px solid black;
`

export const MasterList = styled.ol`
  list-style: none;
  height: 80px;
  max-height: 80px;
  overflow: scroll;
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
`