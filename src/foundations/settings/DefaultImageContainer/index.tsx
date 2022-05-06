import React, { useState } from "react";
import * as S from "./styles";

//icons
import ChangeIcon from "@I/icons/writeMessage/imageEdit/change.svg";

function InitialImageContainer({ image, setIsModalOpen }: any) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <S.ImageContainer>
      <S.Image src={image} imgLoaded={imgLoaded} onLoad={() => setImgLoaded(true)} />
      <S.ChangeContainer onClick={() => setIsModalOpen(true)}>
        <S.Change src={ChangeIcon} />
      </S.ChangeContainer>
    </S.ImageContainer>
  );
}
export default InitialImageContainer;
