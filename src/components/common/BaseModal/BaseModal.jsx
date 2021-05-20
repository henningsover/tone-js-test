import React, { useRef } from 'react';
import * as S from './styled';

export default function LoadSongModal({toggleModal, size, children}) {

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      toggleModal();
    }
  };

  return (
    <S.Background ref={modalRef} onClick={(e) => closeModal(e)}>
      <S.ModalWrapper size={size}>
        {children}
        <S.CloseModalButton onClick={toggleModal} />
      </S.ModalWrapper>
    </S.Background>
  );
}
