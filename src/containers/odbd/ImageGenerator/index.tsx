import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import useResize from "@/utils/hooks/useResize";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

import { DB } from "@/containers/odbd/data";

import { KAKAO_ODBD_ID } from "@/configs/kakao";
import html2canvas from "html2canvas";

const BACKGROUND_LINK = `https://operating-as-usual.vercel.app/INTERNETINENTAL/images/odbd`;

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
    animation: "appear-from-top",
    delay: 1.0,
  },
  {
    img: "card 2",
    width: 130,
    x: 185,
    y: 350,
    animation: "appear-from-top",
    delay: 1.5,
  },
  {
    img: "card 3",
    width: 130,
    x: 341,
    y: 350,
    animation: "appear-from-top",
    delay: 2.0,
  },
  {
    img: "result1_button1",
    width: 110,
    x: 39,
    y: 586,
    animation: "appear-from-bottom",
    delay: 1.0,
  },
  {
    img: "result1_button2",
    width: 110,
    x: 195,
    y: 586,
    animation: "appear-from-bottom",
    delay: 1.5,
  },
  {
    img: "result1_button3",
    width: 110,
    x: 351,
    y: 586,
    animation: "appear-from-bottom",
    delay: 2.0,
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
    background: true,
  },
  {
    img: "result2_background_asset1",
    width: 340,
    x: 160,
    y: 587,
    background: true,
  },
  {
    img: "result2_button1",
    width: 190,
    x: 31,
    y: 700,
    cursor: "pointer",

    isButton: "link",
  },
  {
    img: "result2_button2",
    width: 190,
    x: 279,
    y: 700,
    cursor: "pointer",

    isButton: "kakao",
  },
];

const ELEMENT_PAPER = {
  img: "result2_paper",
  width: 440,
  height: 440,
  x: 30,
  y: 280,

  animationDuration: 1.0,
};

const DUMMY_CARDS = [
  "/odbd/4_result_page_1/1_where_front/where_card_front1.png",
  "/odbd/4_result_page_1/1_where_front/where_card_front2.png",
  "/odbd/4_result_page_1/1_where_front/where_card_front3.png",
];

const RANGE = [13, 22, 32];

export default function Comp() {
  const ARR = [0, 0, 0];

  const [state, setState] = useState(2);
  const [ASSET_LINK, setAssetLink] = useState(ASSET_LINK_1);

  useEffect(() => {
    let timeout: any;
    if (state === 1) {
      timeout = setTimeout(handleTransition, 3.5 * 1000);
    }
    if (state === 2) {
      setAssetLink(ASSET_LINK_2);
    }

    return () => timeout && clearTimeout(timeout);
  }, [state]);

  ///show contents & handle next
  const [showContents, setShowContents] = useState(false);
  useEffect(() => {
    setShowContents(true);
  }, [state]);
  function handleTransition() {
    setShowContents(false);
    setTimeout(() => {
      setState(2);
    }, 1500);
  }

  const [windowWidth, windowHeight] = useResize();
  const locFormatter = useCallback(
    ({ width, x, y, animation = "appear", delay = 0.3, animationDuration = 0.4, additionalAnimations = [], background = false, ...otherParams }: any) => {
      let anim = `${animation} ${animationDuration}s ease-in-out both`;
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
        const xExpand = (windowWidth * 0.3 + 768 * 0.7) / 500;
        const xStart = windowWidth / 2 - xExpand * 250;

        const yScale = windowHeight / 900;
        return {
          width: `${width}px`,
          left: `${(width / 2 + x) * xExpand - width / 2 + xStart}px`,
          top: `${y <= 350 ? y * yScale : windowHeight - (800 - y) * yScale}px`,
          animation: anim,
          animationDelay: `${delay}s`,
          ...otherParams,
        };
      } else if (background) {
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

  const letterElRef = useRef<HTMLDivElement>(null);

  async function handleButtonClick(isButton: string) {
    if (isButton === "link") {
      //copy current url
      const url = "https://snufestival.com/odbd";
      await navigator.clipboard.writeText(url);
      await new Promise((resolve) => setTimeout(resolve, 350));
      alert("링크가 복사되었습니다.");
    } else {
      shareKakao();
    }
  }

  async function shareKakao() {
    console.log("202");
    const url = await letterElImg();
    console.log(url);

    // if (!url) return;
    // window.Kakao.Link.sendCustom({
    //   templateId: KAKAO_ODBD_ID,
    //   templateArgs: {
    //     imageUrl: url,
    //   },
    // });
  }

  useEffect(() => {
    letterElImg();
  }, []);

  const [currCombination, setCurrCombination] = useState([0, 1, 17]);

  const [getNextCombi, setGetNextCombi] = useState(false);

  useEffect(() => {
    if (getNextCombi) {
      let COMBI = [13, 22, 32];

      //generate next combination with RANGE as a boundary
      const combiToIdx = currCombination[0] * 22 * 32 + currCombination[1] * 32 + currCombination[2];
      const nextCombiIdx = (combiToIdx + 1) % (13 * 22 * 32);

      if (nextCombiIdx >= 50 && nextCombiIdx < 13 * 22 * 32) {
        COMBI[0] = Math.floor(nextCombiIdx / (22 * 32));
        COMBI[1] = Math.floor((nextCombiIdx % (22 * 32)) / 32);
        COMBI[2] = nextCombiIdx % 32;

        setCurrCombination(COMBI);
      }

      setGetNextCombi(false);
    }
  }, [getNextCombi]);

  useEffect(() => {
    letterElImg();
  }, [currCombination]);

  async function letterElImg() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!letterElRef.current) return;
    const canvas = await html2canvas(letterElRef.current, {
      useCORS: true,
    });
    const dataURL = canvas.toDataURL("image/png");

    //download iamge
    const a = document.createElement("a");

    a.href = dataURL;

    a.download = `result_${currCombination[0]}-${currCombination[1]}-${currCombination[2]}.png`;
    a.click();

    //a remove
    a.remove();

    setGetNextCombi(true);
  }

  return (
    <CS.Container>
      <CS.Contents>
        <CS.Title>보드게임으로 알아보는 오늘의 운세</CS.Title>

        {state === 2 && (
          <S.Img style={locFormatter(ELEMENT_PAPER)} ref={letterElRef}>
            <img
              src={`${ASSET_LINK}/kakao_back.png`}
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
            <img
              src={`${ASSET_LINK}/${ELEMENT_PAPER.img}.png`}
              style={{
                transform: "translateY(2rem)",
              }}
            />
            <S.Title>보드게임으로 알아보는 오늘의 운세</S.Title>
            <S.Text>
              <p>{DB[0][currCombination[0]].text}</p>
              <p>{DB[1][currCombination[1]].text}</p>
              <p>{DB[2][currCombination[2]].text}</p>
            </S.Text>
          </S.Img>
        )}

        <CS.Footer>@snufestival</CS.Footer>
      </CS.Contents>
    </CS.Container>
  );
}
