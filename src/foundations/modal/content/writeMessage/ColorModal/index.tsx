import React, { useState } from "react";
import * as S from "./styles";

import COLOR_LIST from "@S/assets/color/colorList";

function ColorModal({ initialColor, onColorClick }: any) {
  const [color, setColor] = useState(initialColor);

  const handleClick = (selectedColor: any, ev: any) => {
    ev.stopPropagation();
    onColorClick(selectedColor);
    setColor(selectedColor);
  };

  return (
    <S.Container>
      <S.ColorContainer>
        {COLOR_LIST.map((color: any, i: number) => (
          <S.Color onClick={(ev: any) => handleClick(color, ev)} color={color} key={i} />
        ))}
      </S.ColorContainer>
    </S.Container>
  );
}
export default ColorModal;
