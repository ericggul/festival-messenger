import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import useResize from "@/utils/hooks/useResize";
import preloadImage from "@U/functions/preload";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

const ASSET_LINKS = [`/odbd/3_picking_page/1_where`, `/odbd/3_picking_page/2_who`, `/odbd/3_picking_page/3_what`];
const CARD_LINKS = [`/odbd/4_result_page_1/1_where_front/where_card_front`, `/odbd/4_result_page_1/2_who_front/who_card_front`, `/odbd/4_result_page_1/3_what_front/what_front`];
const RANGE = [13, 22, 32];

const getRandomInt = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

export default function Comp({ state, handleNext }: any) {
  const [windowWidth, windowHeight] = useResize();

  ///show contents & handle next
  const [showContents, setShowContents] = useState(false);
  useEffect(() => {
    setShowContents(true);
  }, [state]);

  //pre-selected card
  const selectedCardIdx = useMemo(() => getRandomInt(1, RANGE[state]), [state]);
  useEffect(() => {
    preloadImage(`${CARD_LINKS[state]}${selectedCardIdx}.png`);
  }, [selectedCardIdx]);

  const [uiSelectedCardPos, setUISelectedCardPos] = useState(-1);
  const handleCardClick = useCallback(
    (i: number) => {
      setUISelectedCardPos(i);
      // setShowContents(false);
      setTimeout(() => {
        handleNext(state, selectedCardIdx);
      }, 700);
    },
    [selectedCardIdx]
  );

  return (
    <CS.Container>
      <CS.Background>
        <img src={windowWidth < 768 ? `${ASSET_LINKS[state]}/background.png` : `${ASSET_LINKS[state]}/background_desktop.png`} />
      </CS.Background>
      <CS.Contents
        style={{
          opacity: showContents ? 1 : 0,
          justifyContent: "space-between",
        }}
      >
        <S.Header>
          <img src={`${ASSET_LINKS[state]}/header.png`} />
        </S.Header>

        <S.Grid>
          {new Array(16).fill(0).map((_, i) => (
            <S.SingleCard key={i} onClick={() => handleCardClick(i)}>
              <img src={`${ASSET_LINKS[state]}/card.png`} alt="card" />
            </S.SingleCard>
          ))}
        </S.Grid>

        <S.Footer
          style={{
            color: "white",
          }}
        >
          @snufestival
        </S.Footer>
      </CS.Contents>
    </CS.Container>
  );
}
