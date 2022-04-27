import React, { useEffect, useState, useMemo, useRef } from "react";
import * as S from "./styles";

import { CircleSpinner } from "loplat-ui";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const getRandomColor = () => `hsl(${getRandom(0, 360)}, ${getRandom(90, 100)}%, ${getRandom(80, 90)}%)`;

function Loading() {
  const size = 20;
  return (
    <S.Container>
      {new Array(30).fill(0).map((e, i) => (
        <CircleSpinner scale={0.5} key={i} />
      ))}
    </S.Container>
  );
}
export default Loading;
