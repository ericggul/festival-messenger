import React from "react";
import * as S from "./styles";

const BeforeInputImage = ({ onImageChange, deleteAddImageContainer }: any) => {
  return (
    <>
      <S.ImageInput onChange={onImageChange} />
      <S.GuideText>+ 이미지 추가하기</S.GuideText>
      <S.DeleteBox onClick={deleteAddImageContainer}>
        <S.DeleteRect />
      </S.DeleteBox>
    </>
  );
};
export default BeforeInputImage;
