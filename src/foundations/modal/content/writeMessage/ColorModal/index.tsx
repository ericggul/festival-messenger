import React, { useState } from "react";
import * as S from "./styles";

const COLOR_SETS = [
  { h: 68, s: 0, l: 0 },

  { h: 10, s: 46, l: 61 },
  { h: 46, s: 100, l: 53, ziptoss: true, black: true },
  { h: 68, s: 66, l: 71, black: true },

  { h: 120, s: 80, l: 97, black: true },
  { h: 130, s: 20, l: 48 },
  { h: 133, s: 40, l: 51 },
  { h: 151, s: 16, l: 43 },
  { h: 173, s: 40, l: 41 },

  { h: 194, s: 80, l: 36 },
  { h: 205, s: 36, l: 61, black: true },
  { h: 205, s: 80, l: 19 },
  { h: 210, s: 46, l: 43 },

  { h: 215, s: 80, l: 25 },
  { h: 230, s: 30, l: 43 },
  { h: 236, s: 100, l: 88, black: true },
  { h: 259, s: 30, l: 81, black: true },
  { h: 274, s: 46, l: 25 },

  { h: 299, s: 50, l: 47 },

  { h: 331, s: 62, l: 69, black: true },
  { h: 337, s: 80, l: 44 },
  { h: 360, s: 80, l: 67 },
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
