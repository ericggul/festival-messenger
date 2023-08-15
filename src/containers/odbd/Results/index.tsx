import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";
import LoadingContainer from "@C/odbd/Loading";
import useResize from "@/utils/hooks/useResize";

import ImageTransition from "./ImageTransition";

import * as CS from "@C/odbd/styles";
import * as S from "./styles";

import { KAKAO_ODBD_ID } from "@/configs/kakao";
import html2canvas from "html2canvas";

import { DB } from "@/containers/odbd/data";

const BACKGROUND_LINK = `https://operating-as-usual.vercel.app/INTERNETINENTAL/images/odbd`;

const URL = "https://snufestival.com";
const ASSET_LINK_0 = `/odbd/4_result_page_1`;
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
    y: 600,
    animation: "appear-from-bottom",
    delay: 1.0,
  },
  {
    img: "result1_button2",
    width: 110,
    x: 195,
    y: 600,
    animation: "appear-from-bottom",
    delay: 1.5,
  },
  {
    img: "result1_button3",
    width: 110,
    x: 351,
    y: 600,
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
    animation: "appear-from-top",
    delay: 0.7,

    // additionalAnimations: [
    //   {
    //     animation: "stretch-x",
    //     duration: 4.0,
    //     animationDelay: 0,
    //   },
    // ],
  },

  {
    img: "result2_background_asset2",
    width: 230,
    x: 0,
    y: 533,
    background: true,
    animation: "appear-from-left",
    delay: 2.0,

    additionalAnimations: [
      {
        animation: "rotate-shake",
        duration: 1.5,
      },
    ],
  },
  {
    img: "result2_background_asset1",
    width: 340,
    x: 160,
    y: 587,
    background: true,
    animation: "appear-from-left",
    delay: 2.0,

    additionalAnimations: [
      {
        animation: "zoom-a-bit",
        duration: 1.5,
        animationDelay: 2.0,
      },
    ],
  },
  {
    img: "result2_button1",
    width: 190,
    x: 31,
    y: 700,
    cursor: "pointer",
    animation: "appear-from-bottom",
    delay: 1.5,
    additionalAnimations: [
      {
        animation: "rotate-shake",
        duration: 2.4,
        animationDelay: -0.0,
      },
    ],
    isButton: "link",
  },
  {
    img: "result2_button2",
    width: 190,
    x: 279,
    y: 700,
    cursor: "pointer",
    animation: "appear-from-bottom",
    delay: 1.7,
    additionalAnimations: [
      {
        animation: "rotate-shake",
        duration: 2.4,
        animationDelay: -0.6,
      },
    ],
    isButton: "kakao",
  },
];

const ELEMENT_PAPER = {
  img: "result2_paper",
  width: 440,
  x: 30,
  y: 280,
  animation: "appear-by-zoom",
  delay: 1.0,
  animationDuration: 1.0,
};

export default function Comp({ selection }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout: any;
    timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => timeout && clearTimeout(timeout);
  }, []);

  const [state, setState] = useState(1);
  const [ASSET_LINK, setAssetLink] = useState(ASSET_LINK_1);

  useEffect(() => {
    let timeout: any;
    if (!loading) {
      if (state === 1) {
        timeout = setTimeout(handleTransition, 3.5 * 1000);
      }
      if (state === 2) {
        setAssetLink(ASSET_LINK_2);
      }
    }

    return () => timeout && clearTimeout(timeout);
  }, [loading, state]);

  ///show contents & handle next
  const [showContents, setShowContents] = useState(false);
  useEffect(() => {
    setShowContents(true);
  }, [state]);
  function handleTransition() {
    setShowContents(false);
    setTimeout(() => {
      setState(2);
    }, 750);
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
          animationDelay: `${state === 1 ? 2.5 + delay : delay}s`,
          ...otherParams,
        };
      } else if (state === 1) {
        const xExpand = (windowWidth * 0.3 + 768 * 0.7) / 500;
        const xStart = windowWidth / 2 - xExpand * 250;

        const yScale = windowHeight / 900;
        return {
          width: `${width}px`,
          left: `${(width / 2 + x) * xExpand - width / 2 + xStart}px`,
          top: `${y <= 300 ? y * yScale : windowHeight - (800 - y) * yScale}px`,
          animation: anim,
          animationDelay: `${2.5 + delay}s`,
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
      await new Promise((resolve) => setTimeout(resolve, 300));
      alert("링크가 복사되었습니다.");
    } else {
      shareKakao();
    }
  }

  async function shareKakao() {
    // const url = await letterElImg();

    // if (!url) return;

    let text = `오늘의 운세: ${DB[0][parseInt(selection[0]) - 1].text} ${DB[1][parseInt(selection[1]) - 1].text} ${DB[2][parseInt(selection[2]) - 1].text}`;

    console.log(ASSET_LINK_0 + DB[0][parseInt(selection[0]) - 1].imgURL);
    window.Kakao.Link.sendCustom({
      templateId: KAKAO_ODBD_ID,
      templateArgs: {
        imageUrl1: URL + ASSET_LINK_0 + DB[0][parseInt(selection[0]) - 1].imgURL,
        imageUrl2: URL + ASSET_LINK_0 + DB[1][parseInt(selection[1]) - 1].imgURL,
        imageUrl3: URL + ASSET_LINK_0 + DB[2][parseInt(selection[2]) - 1].imgURL,
        text,
      },
    });
  }

  async function letterElImg() {
    if (!letterElRef.current) return;
    const canvas = await html2canvas(letterElRef.current);
    const dataURL = canvas.toDataURL("image/png");

    //dataurl to globally accessible url
    const blobBin = atob(dataURL.split(",")[1]);
    const array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], { type: "image/png" });
    // const url = URL.createObjectURL(file);

    // return url;
  }

  const [showBackgroundAsImage, setShowBackgroundAsImage] = useState(false);
  const windowWidthMoreThanZeroRef = useRef(0);

  useEffect(() => {
    if (windowWidth > 0) {
      if (windowWidthMoreThanZeroRef.current != 0 && windowWidthMoreThanZeroRef.current != windowWidth) {
        setShowBackgroundAsImage(true);
      }
      windowWidthMoreThanZeroRef.current = windowWidth;
    }
  }, [windowWidth]);

  return (
    <CS.Container>
      <CS.Background>
        {/* <img
          style={{
            zIndex: 0,
          }}
          src={`${BACKGROUND_LINK}/${state === 1 ? "from" : "to"}/${windowWidth < 768 ? "background" : "background_PC"}.png`}
        /> */}

        <ImageTransition
          startTransition={state === 2}
          fromImgUrl={`${BACKGROUND_LINK}/from/${windowWidth < 768 ? "background" : "background_PC"}.png`}
          toImgUrl={`${BACKGROUND_LINK}/to/${windowWidth < 768 ? "background" : "background_PC"}.png`}
          duration={3600}
        />

        <img
          style={{
            opacity: showBackgroundAsImage ? 1 : 0,
          }}
          src={`${BACKGROUND_LINK}/${state === 1 ? "from" : "to"}/${windowWidth < 768 ? "background" : "background_PC"}.png`}
        />
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
              <img
                src={
                  el.img.includes("card") ? ASSET_LINK_0 + DB[parseInt(el.img.split(" ")[1]) - 1][parseInt(selection[parseInt(el.img.split(" ")[1]) - 1]) - 1].imgURL : `${ASSET_LINK}/${el.img}.png`
                }
              />
            </CS.Img>
          ))}
        {state === 2 &&
          ELEMENTS_2.map((el, i) => (
            <CS.Img key={i} style={locFormatter(el)} onClick={() => el.isButton && handleButtonClick(el.isButton)}>
              <img src={`${ASSET_LINK}/${el.img}.png`} />
            </CS.Img>
          ))}

        {state === 2 && (
          <CS.Img style={locFormatter(ELEMENT_PAPER)} ref={letterElRef}>
            <img src={`${ASSET_LINK}/${ELEMENT_PAPER.img}.png`} />
            <S.Text>
              <p>{DB[0][parseInt(selection[0]) - 1].text}</p>
              <p>{DB[1][parseInt(selection[1]) - 1].text}</p>
              <p>{DB[2][parseInt(selection[2]) - 1].text}</p>
            </S.Text>
          </CS.Img>
        )}

        <S.Footer>
          <p
            onClick={() => {
              const LINK = `https://www.instagram.com/snufestival/`;
              window.open(LINK, "_blank");
            }}
          >
            @snufestival
          </p>
          <p
            onClick={() => {
              const LINK = `https://www.instagram.com/schumpeterstrasse/`;
              window.open(LINK, "_blank");
            }}
          >
            Developed by JYC
          </p>
        </S.Footer>
      </CS.Contents>

      <LoadingContainer show={loading} />
    </CS.Container>
  );
}
