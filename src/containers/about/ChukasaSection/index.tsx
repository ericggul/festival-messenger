import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import * as S from "./styles";
import useResize from "@U/hooks/useResize";
import Carousel from "@F/about/Carousel";
import Poster22Spring from "@I/poster/22spring.png";
import Poster21Fall from "@I/poster/21fall.png";
import Poster21Spring from "@I/poster/21spring.png";
import Poster19Spring from "@I/poster/19spring.png";
import Poster18Spring from "@I/poster/18spring.jpg";
import Poster17Spring from "@I/poster/17spring.jpeg";
import Poster19Fall from "@I/poster/19fall.png";
import Poster18Fall from "@I/poster/18fall.jpeg";
import Poster17Fall from "@I/poster/17fall.jpg";
import Poster16Fall from "@I/poster/16fall.jpg";

//confetti
import ReactCanvasConfetti from "react-canvas-confetti";

import { archives } from "./data";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function ChukasaSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = useMemo(() => archives[currentIndex % archives.length], [currentIndex]);

  const [windowWidth, windowHeight] = useResize();
  const isMobile = useMemo(() => (windowWidth < 768 ? true : false), [windowWidth, windowHeight]);

  //confetti
  const canvasStyles = {
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  };

  const getAnimationSettings = (originXA: any, originXB: any) => {
    return {
      startVelocity: 30,
      spread: 360,
      ticks: 120,
      zIndex: 10,
      particleCount: 100,
      origin: {
        x: getRandom(originXA, originXB),
        y: Math.random() - 0.2,
      },
    };
  };
  const refAnimationInstance = useRef<any>(null);
  const [intervalId, setIntervalId] = useState<any>(null);
  const getInstance = (instance: any) => (refAnimationInstance.current = instance);
  const nextTickAnimation = () => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  };

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 1000));
    }
  }, [intervalId, nextTickAnimation]);

  useEffect(() => {
    startAnimation();
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <S.Container>
      <S.Header>역대 축제 아카이브</S.Header>
      <S.Main>
        <Carousel
          className="Carousel"
          fullHeight={isMobile ? 340 : windowHeight / 1.5}
          fullWidth={isMobile ? 340 : windowHeight / 1.5}
          items={[Poster22Spring, Poster21Fall, Poster21Spring, Poster19Fall, Poster19Spring, Poster18Fall, Poster18Spring, Poster17Fall, Poster17Spring, Poster16Fall].map((image, idx: number) => (
            <S.Poster key={idx}>
              <img src={image} alt="포스터" />
            </S.Poster>
          ))}
          emitCurrentIndex={setCurrentIndex}
        />

        <S.Texts>
          <p>{currentItem.time}</p>
          <p>{currentItem.name}</p>
          <div>
            {currentItem.description.split("  ").map((a, i) => (
              <div key={i}>
                {a}
                <br />
              </div>
            ))}
          </div>
        </S.Texts>

        <S.Line />
        <S.ButtonGuide>2021 온라인 축제 링크</S.ButtonGuide>
        <S.Buttons>
          <a href="https://snu-festival.web.app" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none" }}>
            <S.Button>
              <p>2021 온라인 봄축제</p>
              <p>페스월드 바로가기</p>
            </S.Button>
          </a>

          <a href="https://snufestival.com" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none" }}>
            <S.Button>
              <p>2021 온라인 가을축제</p>
              <p>관악의 밤 바로가기</p>
            </S.Button>
          </a>
        </S.Buttons>
      </S.Main>
    </S.Container>
  );
}
export default ChukasaSection;
