import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import useResize from "@/utils/hooks/useResize";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

const ASSET_LINK_EXPLAIN = `/odbd/2_explain_page`;
const ASSET_LINK_INTRO = `/odbd/1_intro_page`;

export const ELEMENTS_EXPLAIN = [
  {
    img: "seolmuing",
    width: 270,
    x: 115,
    y: 25,
    animation: "appear-by-zoom",
    delay: 0.4,
    additionalAnimations: [
      {
        animation: "jump",
        duration: 1,
        animationDelay: 1,
      },
    ],
  },
  {
    img: "righttop",
    x: 21,
    y: 10,
    width: 108,
    animation: "appear-from-top",
    delay: 0.1,
  },
  {
    img: "lefttop",
    x: 371,
    y: 10,
    width: 108,
    animation: "appear-from-top",
    delay: 0.1,
  },
  {
    img: "rightleft",
    x: 21,
    yBottom: 10,
    width: 108,
    animation: "appear-from-bottom",
  },
  {
    img: "rightdown",
    x: 371,
    yBottom: 10,
    width: 108,
    animation: "appear-from-bottom",
    delay: 0.1,
  },

  {
    img: "ex1234",
    x: 70,
    yBottom: 260,
    width: 360,
    animation: "appear-by-zoom",
    delay: 0.4,
  },
  {
    img: "ok",
    width: 270,
    x: 125,
    yBottom: 30,
    isButton: true,
    cursor: "pointer",
    animation: "appear-from-bottom",
    delay: 0.4,

    additionalAnimations: [
      {
        animation: "zoom-a-bit",
        duration: 0.25,
        animationDelay: 0.4,
      },
    ],
  },
];

const ELEMENTS_INTRO = [
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
    additionalAnimations: [
      {
        animation: "grow",
        duration: 3,
      },
    ],
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
    isButton: true,
  },
];

export default function Comp({ audioRef, state, setState, setShowLoading }: any) {
  const [windowWidth, windowHeight] = useResize();
  const locFormatter = useCallback(
    ({ width, x, y = 0, yBottom = 0, height = 0, animation = "appear", delay = 0.3, additionalAnimations = [], ...otherParams }: any) => {
      let anim = `${animation} 0.4s ease-in-out both`;
      additionalAnimations.forEach(({ animation, delay, duration }: any) => {
        anim += `, ${animation} ${duration}s ease-in-out both infinite`;
      });

      if (windowWidth < 600) {
        const xScale = windowWidth / 500;
        const yScale = windowHeight / 900;

        const res = {
          width: `${width * xScale}px`,
          left: `${x * xScale}px`,
          animation: anim,
          animationDelay: `${delay}s`,
          ...otherParams,
        };
        if (height > 0) {
          res.height = `${height * yScale}px`;
        }
        if (y > 0) {
          res.top = `${y * yScale}px`;
        }
        if (yBottom > 0) {
          res.bottom = `${yBottom * yScale}px`;
        }

        return res;
      } else if (state === "intro") {
        const xExpand = windowWidth / 500;
        const xStart = windowWidth / 2 - xExpand * 250;

        const yScale = windowHeight / 900;
        let res = {
          width: `${width}px`,
          left: `${(width / 2 + x) * xExpand - width / 2 + xStart}px`,
          animation: anim,
          animationDelay: `${delay}s`,
          ...otherParams,
        };

        if (height > 0) {
          res.height = `${height * yScale}px`;
        }
        if (y > 0) {
          res.top = `${y * yScale}px`;
        }
        if (yBottom > 0) {
          res.bottom = `${yBottom * yScale}px`;
        }

        return res;
      } else {
        const yScale = windowHeight / 900;

        let res = {
          width: `${width}px`,
          left: `${windowWidth / 2 - 250 + x}px`,
          animation: anim,
          animationDelay: `${delay}s`,
          ...otherParams,
        };

        if (height > 0) {
          res.height = `${height * yScale}px`;
        }

        if (y > 0) {
          res.top = `${y * yScale}px`;
        }
        if (yBottom > 0) {
          res.bottom = `${yBottom * yScale}px`;
        }

        return res;
      }
    },
    [state, windowWidth, windowHeight]
  );

  ///show contents & handle next
  const [showContents, setShowContents] = useState(false);
  useEffect(() => {
    setShowContents(true);
  }, [state]);

  function handleIntroClick() {
    try {
      audioRef.current.play();
    } catch (e) {
      console.log(e);
    }
    setShowContents(false);
    setTimeout(() => {
      setState("expl");
    }, 400);
  }

  function handleExplClick() {
    setShowContents(false);
    setTimeout(() => {
      setState("card 0");
    }, 400);
  }

  const [imgLoaded, setImgLoaded] = useState(0);

  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (imgLoaded >= 7) {
      timeoutRef.current = setTimeout(() => {
        setShowLoading(false);
      }, 1500);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [imgLoaded]);

  return (
    <CS.Container>
      <CS.Background>
        <img onLoad={() => setImgLoaded((i: any) => i + 1)} src={windowWidth < 768 ? `${ASSET_LINK_INTRO}/background_iP.png` : `${ASSET_LINK_INTRO}/background_PC.png`} />
      </CS.Background>
      <CS.Contents
        style={{
          opacity: showContents ? 1 : 0,
        }}
      >
        {state === "expl" && (
          <S.Text
            style={locFormatter({
              x: 56,
              y: 60,
              width: 395,
              height: 800,
            })}
          >
            <S.InnerText>
              {`12장의 단어가 적힌 카드 중 한 장씩 총 세 장을
뽑아 `}
              <span
                style={{
                  color: "#ff0000",
                }}
              >
                '누구와'
              </span>
              <span
                style={{
                  color: "#FFFF00",
                }}
              >
                '어디서'
              </span>
              <span
                style={{
                  color: "#1917ff",
                }}
              >
                '무엇을'
              </span>
              {`할 지
정하게 됩니다. 이후 이 세 단어가 당신이 오늘
일어날 일을 결정할 것입니다.
조언하자면...
하루 동안은 오늘의 운세를 기억해두는 게 
좋을 겁니다.
분명 일어날 일일지도?
`}
            </S.InnerText>
          </S.Text>
        )}
        {state === "intro" &&
          ELEMENTS_INTRO.map((el, i) => (
            <CS.Img key={i} style={locFormatter(el)} onClick={() => el.isButton && handleIntroClick()}>
              <img onLoad={() => setImgLoaded((i: any) => i + 1)} src={`${ASSET_LINK_INTRO}/${el.img}.png`} />
            </CS.Img>
          ))}
        {state === "expl" &&
          ELEMENTS_EXPLAIN.map((el, i) => (
            <CS.Img key={i} style={locFormatter(el)} onClick={() => el.isButton && handleExplClick()}>
              <img src={`${ASSET_LINK_EXPLAIN}/${el.img}.png`} />
            </CS.Img>
          ))}
      </CS.Contents>
    </CS.Container>
  );
}
