import React, { useState } from "react";
import * as S from "./styles";

const FONT_LIST = ["Seoul Namsan", "Noto Sans KR", "Nanum Gothic", "Jua", "Kirang Haerang", "Stylish", "Gamja Flower", "Single Day", "Nanum Pen Script"];
const TEXT = ["반듯한", "글씨체", "세가지", "특이한", "글씨체", "세가지", "귀여운", "글씨체", "세가지"];

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
            {TEXT[i]}
          </S.Font>
        ))}
      </S.FontContainer>
    </S.Container>
  );
}
export default FontModal;
