import React, { useState } from "react";
import * as S from "./styles";

const FONT_LIST = ["Seoul Namsan", "Black Han Sans", "IBM Plex Sans", "Jua", "Kirang Haerang", "Nanum Pen Script", "Noto Sans KR", "Noto Serif KR"];

function FontModal({ initialFont, onFontClick }: any) {
  const [font, setFont] = useState(initialFont);

  const handleClick = (e: any, selectedFont: any) => {
    e.stopPropagation();
    setFont(selectedFont);
    onFontClick(selectedFont);
  };
  return (
    <S.Container>
      <S.FontContainer>
        {FONT_LIST.map((thisFont: any, i: number) => (
          <S.Font selected={font === thisFont} key={i} font={thisFont} onClick={(e) => handleClick(e, thisFont)}>
            {thisFont}
          </S.Font>
        ))}
      </S.FontContainer>
    </S.Container>
  );
}
export default FontModal;
