import React from "react";
import * as S from "./styles";



const RotateText = ({ text, colorBlack }: any) => {
  return (
    <S.RotateText colorBlack={colorBlack || false}>
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
