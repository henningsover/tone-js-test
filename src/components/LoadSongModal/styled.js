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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3fr;
  width: 800px;
  height: 500px;
  box-shadow: 0 5px, 16px, rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  padding: 20px;
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

export const RightCol = styled.div `
  padding: 5px 20px;
  overflow: scroll;
`

export const LeftCol = styled.div`
  padding: 5px 20px;
  border-right: 1px solid black;
  overflow: scroll;
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
