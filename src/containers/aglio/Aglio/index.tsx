import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";

//preload images
import Loading from "@I/aglio/loading.png";
import Chukasa from "@I/aglio/chukasa.png";

export default function Aglio() {
  const [semicloneNumbers, setSemicloneNumbers] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSemicloneNumbers((prev) => (prev + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      <S.Inner>
        <S.Contents>
          <S.HeaderContainer>
            <S.Header>LOADING!</S.Header>
            <S.Upper>
              열심히 <span>분석하리오{".".repeat(semicloneNumbers)}</span>
            </S.Upper>
          </S.HeaderContainer>

          <S.ImageContainer>
            <img src={Loading} />
          </S.ImageContainer>

          <S.ChukasaContainer>
            <img src={Chukasa} />
          </S.ChukasaContainer>
        </S.Contents>
      </S.Inner>
    </S.Container>
  );
}
