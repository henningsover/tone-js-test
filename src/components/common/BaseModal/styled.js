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
  background: aliceblue;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  @media(min-width: 690px) {
    width: ${props => props.size === "small" ?
      "400px" : "800px"};
  }
`;

export const CloseModalButton = styled(MdClose)`
  position: absolute;
  top: 20px;
  right: 20px;
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