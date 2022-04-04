import React, { useState } from "react";
import * as S from "./styles";

const COLOR_SETS = [
  { h: 0, s: 16, l: 43 },
  { h: 10, s: 16, l: 61 },
  { h: 50, s: 16, l: 43 },
  { h: 68, s: 16, l: 61 },
  { h: 101, s: 16, l: 61 },
  { h: 119, s: 16, l: 43 },
  { h: 130, s: 20, l: 48 },
  { h: 133, s: 16, l: 61 },
  { h: 151, s: 16, l: 43 },
  { h: 173, s: 16, l: 61 },
  { h: 205, s: 16, l: 61 },
  { h: 230, s: 16, l: 43 },
  { h: 259, s: 16, l: 61 },
  { h: 274, s: 16, l: 43 },
  { h: 299, s: 16, l: 61 },
  { h: 324, s: 16, l: 61 },
  { h: 360, s: 14, l: 51 },
];

function ColorModal({ initialColor, onColorClick }: any) {
  const [color, setColor] = useState(initialColor);

  const handleClick = (selectedColor: any, ev: any) => {
    ev.stopPropagation();
    onColorClick(selectedColor);
    setColor(selectedColor);
  };

  console.log(color);

  return (
    <S.Container>
      <S.ColorContainer>
        {COLOR_SETS.map((color: any, i: number) => (
          <S.Color onClick={(ev: any) => handleClick(color, ev)} color={color} key={i} />
        ))}
      </S.ColorContainer>
    </S.Container>
  );
}
export default ColorModal;
