import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import useResize from "@/utils/hooks/useResize";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

const ASSET_LINK_1 = `/odbd/4_result_page_1/etc`;

const ASSET_LINK_2 = `/odbd/5_result_page_2`;

const ELEMENTS_1 = [
  {
    img: "result_title",
    width: 400,
    x: 50,
    y: 138,
  },
  {
    img: "card 1",
    width: 130,
    x: 29,
    y: 350,
  },
  {
    img: "card 2",
    width: 130,
    x: 185,
    y: 350,
  },
  {
    img: "card 3",
    width: 130,
    x: 341,
    y: 350,
  },
  {
    img: "result1_button1",
    width: 110,
    x: 39,
    y: 586,
  },
  {
    img: "result1_button2",
    width: 110,
    x: 195,
    y: 586,
  },
  {
    img: "result1_button3",
    width: 110,
    x: 351,
    y: 586,
  },
];

const ELEMENTS_2 = [
  {
    img: "result_title",
    width: 400,
    x: 50,
    y: 138,
  },

  {
    img: "result2_background_asset2",
    width: 230,
    x: 0,
    y: 533,
  },
  {
    img: "result2_background_asset1",
    width: 340,
    x: 160,
    y: 587,
  },

  {
    img: "result_title",
    width: 400,
    x: 50,
    y: 138,
  },
  {
    img: "result2_button1",
    width: 190,
    x: 31,
    y: 700,
  },
  {
    img: "result2_button2",
    width: 190,
    x: 279,
    y: 700,
  },
];

const ELEMENT_PAPER = {
  img: "result2_paper",
  width: 440,
  x: 30,
  y: 280,
};

const DUMMY_CARDS = [
  "/odbd/4_result_page_1/1_where_front/where_card_front1.png",
  "/odbd/4_result_page_1/1_where_front/where_card_front2.png",
  "/odbd/4_result_page_1/1_where_front/where_card_front3.png",
];

export default function Comp({ type }: any) {
  const [state, setState] = useState(2);
  const [ASSET_LINK, setAssetLink] = useState(ASSET_LINK_1);

  useEffect(() => {
    if (state === 2) {
      setAssetLink(ASSET_LINK_2);
    }
  }, [state]);

  const [windowWidth, windowHeight] = useResize();
  const locFormatter = useCallback(
    ({ width, x, y, animation = "appear", delay = 0.3, additionalAnimations = [], ...otherParams }: any) => {
      let anim = `${animation} 0.4s ease-in-out both`;
      additionalAnimations.forEach(({ animation, delay, duration }: any) => {
        anim += `, ${animation} ${duration}s ease-in-out both infinite`;
      });

      if (windowWidth < 600) {
        const xScale = windowWidth / 500;
        const yScale = windowHeight / 900;

        return {
          width: `${width * xScale}px`,
          left: `${x * xScale}px`,
          top: `${y * yScale}px`,
          animation: anim,
          animationDelay: `${delay}s`,
          ...otherParams,
        };
      } else if (state === 1) {
        const xExpand = windowWidth / 500;
        const xStart = windowWidth / 2 - xExpand * 250;

        const yScale = windowHeight / 900;
        return {
          width: `${width}px`,
          left: `${(width / 2 + x) * xExpand - width / 2 + xStart}px`,
          top: `${y * yScale}px`,
          animation: anim,
          animationDelay: `${delay}s`,
          ...otherParams,
        };
      } else {
        const yScale = windowHeight / 900;

        return {
          width: `${width}px`,
          left: `${windowWidth / 2 - 250 + x}px`,
          top: `${y * yScale}px`,
          animation: anim,
          animationDelay: `${delay}s`,
          ...otherParams,
        };
      }
    },
    [state, windowWidth, windowHeight]
  );

  ///show contents & handle next
  const [showContents, setShowContents] = useState(false);
  useEffect(() => {
    setShowContents(true);
  }, [state]);
  function handleClick() {
    setShowContents(false);
    setTimeout(() => {}, 700);
  }

  return (
    <CS.Container>
      <CS.Background>
        <img src={windowWidth < 768 ? `${ASSET_LINK}/background.png` : `${ASSET_LINK}/background_PC.png`} />
      </CS.Background>
      <CS.Contents
        style={{
          opacity: showContents ? 1 : 0,
        }}
      >
        <CS.Title>보드게임으로 알아보는 오늘의 운세</CS.Title>
        {state === 1 &&
          ELEMENTS_1.map((el, i) => (
            <CS.Img key={i} style={locFormatter(el)}>
              <img src={el.img.includes("card") ? DUMMY_CARDS[parseInt(el.img.split(" ")[1]) - 1] : `${ASSET_LINK}/${el.img}.png`} />
            </CS.Img>
          ))}

        {state === 2 &&
          ELEMENTS_2.map((el, i) => (
            <CS.Img key={i} style={locFormatter(el)}>
              <img src={`${ASSET_LINK}/${el.img}.png`} />
            </CS.Img>
          ))}

        {state === 2 && (
          <CS.Img style={locFormatter(ELEMENT_PAPER)}>
            <img src={`${ASSET_LINK}/${ELEMENT_PAPER.img}.png`} />
            <S.Text>
              <p>관정 도서관에서</p>
              <p>교수님과</p>
              <p>밥을 먹는다.</p>
            </S.Text>
          </CS.Img>
        )}

        <CS.Footer>@snufestival</CS.Footer>
      </CS.Contents>
    </CS.Container>
  );
}
