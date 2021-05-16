import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
`;

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 500px;
  box-shadow: 0 5px, 16px, rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media(min-width: 690px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 3fr;
    width: 800px;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  grid-column: 1 / 3;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 70vw;
  height: 30px;
  padding-left: 5px;
`

export const UserListWrapper = styled.div`
  padding: 5px 20px;
  overflow: scroll;
  border-top: 1px solid black;
  max-height: 110px;

  @media(min-width:690px) {
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
`

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
