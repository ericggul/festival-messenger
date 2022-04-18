import React from "react";
import * as S from "./styles";

const RotateText = ({ text }: any) => {
  return (
    <S.RotateText>
      {text
        .trim()
        .split("")
        .map((t: String, i: number, array: any) => (
          <S.Span key={i} idx={i}>
            {t === " " ? "\u00A0" : t}
          </S.Span>
        ))}
    </S.RotateText>
  );
};

export default RotateText;
