import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import useResize from "@/utils/hooks/useResize";

import ImageTransition from "./ImageTransition";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

import { KAKAO_ODBD_ID } from "@/configs/kakao";
import html2canvas from "html2canvas";

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
    delay: 0.75,
  },
  {
    img: "card 2",
    width: 130,
    x: 185,
    y: 350,
    animation: "appear-from-top",
    delay: 1.0,
  },
  {
    img: "card 3",
    width: 130,
    x: 341,
    y: 350,
    animation: "appear-from-top",
    delay: 1.25,
  },
  {
    img: "result1_button1",
    width: 110,
    x: 39,
    y: 586,
    animation: "appear-from-bottom",
    delay: 0.75,
  },
  {
    img: "result1_button2",
    width: 110,
    x: 195,
    y: 586,
    animation: "appear-from-bottom",
    delay: 1.0,
  },
  {
    img: "result1_button3",
    width: 110,
    x: 351,
    y: 586,
    animation: "appear-from-bottom",
    delay: 1.25,
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
    cursor: "pointer",
  },
  {
    img: "result2_button2",
    width: 190,
    x: 279,
    y: 700,
    cursor: "pointer",
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
  const [state, setState] = useState(1);
  const [ASSET_LINK, setAssetLink] = useState(ASSET_LINK_1);

  useEffect(() => {
    let timeout: any;
    if (state === 1) {
      timeout = setTimeout(handleTransition, 2.5 * 1000);
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
    }, 1200);
  }

  const [windowWidth, windowHeight] = useResize();
  const locFormatter = useCallback(
    ({ width, x, y, animation = "appear", delay = 0.3, additionalAnimations = [], background = false, ...otherParams }: any) => {
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

  async function shareKakao() {
    console.log("202");
    const url = await letterElImg();
    console.log(url);

    //todo: upload url

    if (!url) return;
    window.Kakao.Link.sendCustom({
      templateId: KAKAO_ODBD_ID,
      templateArgs: {
        imageUrl: `https://snufestival.com/assets/images/aglio/16-types/ENTP.png`,
      },
    });
  }

  async function letterElImg() {
    if (!letterElRef.current) return;
    const canvas = await html2canvas(letterElRef.current);
    const dataURL = canvas.toDataURL("image/png");

    return dataURL;
    // const link = document.createElement("a");
    // link.download = `알리오.png`;
    // document.body.appendChild(link);
    // link.href = dataURL;
    // link.click();
    // document.body.removeChild(link);
  }

  return (
    <CS.Container>
      <CS.Background>
        {/* <ImageTransition 
        startTransition={true}
        fromImgUrl={`${ASSET_LINK}/background.png`}
        toImgUrl={`${ASSET_LINK}/background_PC.png`}
    duration={3000}
        
        /> */}
        <img src={windowWidth < 768 ? `${ASSET_LINK}/background.png` : `${ASSET_LINK}/background_PC.png`} />
      </CS.Background>
      <CS.Contents
        style={{
          opacity: showContents ? 1 : 0,
          transition: "opacity 0.7s ease-in-out",
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
          <CS.Img style={locFormatter(ELEMENT_PAPER)} ref={letterElRef} onClick={shareKakao}>
            <img src={`${ASSET_LINK}/${ELEMENT_PAPER.img}.png`} />
            <S.Text>
              <p>관정 도서관에서</p>
              <p>교수님과</p>
              <p>밥을 먹는다고 시발</p>
            </S.Text>
          </CS.Img>
        )}

        <CS.Footer>@snufestival</CS.Footer>
      </CS.Contents>
    </CS.Container>
  );
}
