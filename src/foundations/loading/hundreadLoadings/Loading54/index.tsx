import React, { useEffect, useState } from "react";
import * as S from "./styles";

function Loading() {
  const array = "LOADING".split("");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((idx) => (idx + 1) % array.length);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      <S.Rectangle>
        <S.Circle>{array[idx]}</S.Circle>
      </S.Rectangle>
    </S.Container>
  );
}
export default Loading;
