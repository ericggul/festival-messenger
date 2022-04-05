import React from "react";
import * as S from "./styles";

import Cancel from "@I/icons/modal/cancel.svg";

function AddMusicModal({ setIsModalOpen }: any) {
  return (
    <>
      <S.Background />
      <S.Box>
        <S.CloseButton
          onClick={(ev) => {
            ev.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <S.CloseIcon src={Cancel} />
        </S.CloseButton>

        {/* <S.Container>
            <S.Title>추가할 음악을 선택하세요</S.Title>

          </S.Container> */}
      </S.Box>
    </>
  );
}
export default AddMusicModal;
