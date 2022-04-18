import React from "react";
import * as S from "./styles";
import RotateText from "@F/text/RotateText";

const BeforeInputImage = ({ onImageChange, deleteAddImageContainer }: any) => {
  return (
    <S.Container>
      <S.ImageInput onChange={onImageChange} />
      <RotateText text={"+ 이미지 추가하기"} />
      <S.DeleteBox onClick={deleteAddImageContainer}>
        <S.DeleteRect />
      </S.DeleteBox>
    </S.Container>
  );
};
export default BeforeInputImage;
