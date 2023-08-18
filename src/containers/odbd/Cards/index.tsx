import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import styled, { css } from "styled-components";

import useResize from "@/utils/hooks/useResize";
import preloadImage from "@U/functions/preload";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

const ASSET_LINK_INTRO = `/odbd/1_intro_page`;

const ASSET_LINKS = [`/odbd/3_picking_page/1_where`, `/odbd/3_picking_page/2_who`, `/odbd/3_picking_page/3_what`];
const CARD_LINKS = [`/odbd/4_result_page_1/1_where_front/where_card_front`, `/odbd/4_result_page_1/2_who_front/who_card_front`, `/odbd/4_result_page_1/3_what_front/what_front`];
const RANGE = [13, 22, 32];

const getRandomInt = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

export default function Comp({ state, handleNext }: any) {
  const [windowWidth, windowHeight] = useResize();

  ///show contents & handle next

  const [showContents, setShowContents] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContents(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, [state]);

  //pre-selected card
  const selectedCardIdx = useMemo(() => getRandomInt(1, RANGE[state]), [state]);
  useEffect(() => {
    preloadImage(`${CARD_LINKS[state]}${selectedCardIdx}.png`);
  }, [selectedCardIdx]);

  //preload all backgrounds
  useEffect(() => {
    ASSET_LINKS.forEach((el) => {
      preloadImage(`${el}/header.png`);
    });
  }, [windowWidth]);

  //ui selected card index
  const [uiSelectedCardPos, setUISelectedCardPos] = useState(-1);

  //init
  useEffect(() => {
    setUISelectedCardPos(-1);
  }, [state]);

  const handleCardClick = useCallback(
    (i: number) => {
      setUISelectedCardPos(i);
      setTimeout(() => {
        handleNext(state, selectedCardIdx);
      }, 1850);
      setTimeout(() => {
        setShowContents(false);
      }, 1450);
    },
    [selectedCardIdx]
  );

  return (
    <CS.Container>
      <CS.Background>
        <S.Background
          style={{
            zIndex: "1",
            animation: `appear-from-right 0.6s`,
            animationDelay: "0.2s",
          }}
        >
          <img src={windowWidth < 768 ? `${ASSET_LINKS[0]}/background.png` : `${ASSET_LINKS[0]}/background_desktop.png`} />
        </S.Background>

        <S.Background
          style={{
            zIndex: "2",
            transform: `translateX(${state >= 1 ? 0 : -100}vw)`,
          }}
        >
          <img src={windowWidth < 768 ? `${ASSET_LINKS[1]}/background.png` : `${ASSET_LINKS[1]}/background_desktop.png`} />
        </S.Background>
        <S.Background
          style={{
            zIndex: "3",
            transform: `translateY(${state >= 2 ? 0 : -100}vh)`,
          }}
        >
          <img src={windowWidth < 768 ? `${ASSET_LINKS[2]}/background.png` : `${ASSET_LINKS[2]}/background_desktop.png`} />
        </S.Background>

        {/* <S.Background
          style={{
            zIndex: "4",
            transform: `translateY(${state === 3 ? 0 : 100}vh)`,
          }}
        >
          <img src={windowWidth < 768 ? `${ASSET_LINK_INTRO}/background_iP.png` : `${ASSET_LINK_INTRO}/background_PC.png`} />
        </S.Background> */}
      </CS.Background>
      {state <= 2 && (
        <CS.Contents
          style={{
            opacity: showContents ? 1 : 0,
            justifyContent: "space-between",
            zIndex: "5",
            transition: "all 0.2s",
          }}
        >
          <S.Header>
            <img src={`${ASSET_LINKS[state]}/header.png`} />
          </S.Header>

          <S.Grid>
            {showContents &&
              new Array(16).fill(0).map((_, i) => (
                <S.SingleCard
                  style={{
                    transform: `rotateY(${i === uiSelectedCardPos ? 360 : 0}deg)`,
                  }}
                  key={i}
                  onClick={() => uiSelectedCardPos === -1 && handleCardClick(i)}
                >
                  <S.Img src={i === uiSelectedCardPos ? `${CARD_LINKS[state]}${selectedCardIdx}.png` : `${ASSET_LINKS[state]}/card.png`} alt="card" idx={i} />
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
      )}
    </CS.Container>
  );
}
