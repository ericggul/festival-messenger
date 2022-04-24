import React from "react";
import * as S from "./styles";

//icons
import ChangeIcon from "@I/icons/writeMessage/imageEdit/change.svg";

function InitialImageContainer({ image, setIsModalOpen }: any) {
  return (
    <S.Container>
      <S.ImageContainer>
        <S.Image src={image} />
      </S.ImageContainer>
      <S.ImageContainer onClick={() => setIsModalOpen(true)}>
        <p>+</p>
      </S.ImageContainer>
    </S.Container>
  );
}
export default InitialImageContainer;
