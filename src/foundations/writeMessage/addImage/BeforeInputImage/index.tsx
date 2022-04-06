import React from "react";
import * as S from "./styles";

const GuideText = ({ text }: any) => {
  return (
    <S.GuideText>
      {text
        .trim()
        .split("")
        .map((t: String, i: number, array: any) => (
          <S.Span key={i} idx={i}>
            {t === " " ? "\u00A0" : t}
          </S.Span>
        ))}
    </S.GuideText>
  );
};

const BeforeInputImage = ({ onImageChange, deleteAddImageContainer }: any) => {
  return (
    <S.Container>
      <S.ImageInput onChange={onImageChange} />
      <GuideText text={"+ 이미지 추가하기"} />
      <S.DeleteBox onClick={deleteAddImageContainer}>
        <S.DeleteRect />
      </S.DeleteBox>
    </S.Container>
  );
};
export default BeforeInputImage;
