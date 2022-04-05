import React, { useState } from "react";
import * as S from "./styles";

const FONT_LIST = ["Seoul Namsan", "Noto Sans KR", "Nanum Gothic", "Jua", "Kirang Haerang", "Nanum Pen Script", "Gamja Flower", "Single Day", "Stylish"];
const AD_TEXT = ["광고에", "진심인", "개발자", "설입", "낙대", "녹두", "실매물은", "어디서?", "말해뭐해"];

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
            {AD_TEXT[i]}
          </S.Font>
        ))}
      </S.FontContainer>
    </S.Container>
  );
}
export default FontModal;
