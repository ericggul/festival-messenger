import React, { useCallback, useState, useMemo, useRef } from "react";

import useResize from "@/utils/hooks/useResize";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

const ASSET_LINK = `/odbd/1_intro_page`;

const ELEMENTS = [
  {
    img: "untheboaed",
    width: 300,
    x: 100,
    y: 67,
    animation: "appear-from-top",
    delay: 0.1,
    additionalAnimations: [
      {
        animation: "jump",
        duration: 1,
      },
    ],
  },
  {
    img: "riooo",
    width: 452,
    x: 78,
    y: 572,
    delay: 0,
  },
  {
    img: "myluck",
    width: 435,
    x: 55,
    y: 174,
    animation: "appear-from-right",
    delay: 0.2,
  },
  {
    img: "Whatismyluck",
    width: 290,
    x: 0,
    y: 348,
    animation: "appear-from-left",
    delay: 0.3,
    additionalAnimations: [
      {
        animation: "shake",
        duration: 0.5,
      },
    ],
  },
  {
    img: "Chujae",
    width: 290,
    x: 210,
    y: 450,
    animation: "appear-from-top",
    delay: 0.4,
  },
  {
    img: "start_button",
    width: 200,
    x: 150,
    y: 644,
    animation: "appear-from-bottom",
    delay: 0.5,
    cursor: "pointer",
  },
];

export default function Comp({ handleNext }: any) {
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
      } else {
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
      }
    },
    [windowWidth, windowHeight]
  );

  return (
    <CS.Container>
      <CS.Background>
        <img src={windowWidth < 768 ? `${ASSET_LINK}/background_iP.png` : `${ASSET_LINK}/background_PC.png`} />
      </CS.Background>
      <CS.Contents>
        {ELEMENTS.map((el, i) => (
          <CS.Img key={i} style={locFormatter(el)}>
            <img src={`${ASSET_LINK}/${el.img}.png`} />
          </CS.Img>
        ))}

        {/* <CS.Title>보드게임으로 알아보는 오늘의 운세</CS.Title>
        <CS.Footer>@snufestival</CS.Footer> */}
      </CS.Contents>
    </CS.Container>
  );
}
