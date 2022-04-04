import React, { useState } from "react";
import * as S from "./styles";

const FONT_LIST = ["Seoul Namsan", "Black Han Sans", "IBM Plex Sans", "Jua", "Kirang Haerang", "Nanum Pen Script", "Noto Sans KR", "Noto Serif KR"];

function FontModal({ onFontClick }: any) {
  const [font, setFont] = useState("Seoul Namsan");

  const handleClick = (e: any, selectedFont: any) => {
    e.stopPropagation();
    setFont(selectedFont);
    onFontClick(selectedFont);
  };
  return (
    <S.Container>
      <S.FontContainer>
        {FONT_LIST.map((font: any, i: number) => (
          <S.Font key={i} font={font} onClick={(e) => handleClick(e, font)}>
            {font}
          </S.Font>
        ))}
      </S.FontContainer>
    </S.Container>
  );
}
export default FontModal;
