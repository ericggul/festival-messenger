import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import useResize from "@/utils/hooks/useResize";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

const ASSET_LINKS = [`/odbd/3_picking_page/1_where`, `/odbd/3_picking_page/2_who`, `/odbd/3_picking_page/3_what`];

export default function Comp({ state, handleNext }: any) {
  const [windowWidth, windowHeight] = useResize();

  ///show contents & handle next
  const [showContents, setShowContents] = useState(false);
  useEffect(() => {
    setShowContents(true);
  }, [state]);

  function handleClick() {
    setShowContents(false);
    setTimeout(() => {
      handleNext();
    }, 700);
  }

  return (
    <CS.Container>
      <CS.Background>
        <img src={windowWidth < 768 ? `${ASSET_LINKS[state]}/background.png` : `${ASSET_LINKS[state]}/background_desktop.png`} />
      </CS.Background>
      <CS.Contents
        style={{
          opacity: showContents ? 1 : 0,
        }}
      >
        <S.Header>
          <img src={`${ASSET_LINKS[state]}/header.png`} />
        </S.Header>

        <CS.Footer
          style={{
            color: "white",
          }}
        >
          @snufestival
        </CS.Footer>
      </CS.Contents>
    </CS.Container>
  );
}
