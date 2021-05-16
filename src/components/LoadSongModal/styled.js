import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Wrapper = styled.div`

  @media(min-width: 690px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 3fr;
  }
`

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  grid-column: 1 / 3;
  align-items: center;
  background: #5f8999;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

export const SearchInput = styled.input`
  width: 70vw;
  height: 30px;
  padding-left: 5px;

  @media(min-width:690px) {
    width: 400px;
  }
`

export const UserListWrapper = styled.div`
  padding: 5px 20px;
  overflow: scroll;
  border-top: 1px solid black;
  max-height: 110px;

  @media(min-width:690px) {
    border-top: unset;
    border-right: 1px solid black;
  }
`

export const SongListWrapper = styled.div `
  padding: 5px 20px;
  overflow: scroll;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  max-height: 110px;

  @media(min-width:690px) {
    border: none;
  }
`

export const ListItem = styled.li`
  margin: 10px 0px;

  &:hover {
      color: #f79670;
      cursor: pointer;
    }
`

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: black;

  &:hover {
    color: white;
  }
`;
