import React, { useMemo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";
import Kakao from "@I/icons/kakao/kakao.svg";

//import toast
import toast from "react-hot-toast";

//colors
const KAKAO_YELLOW = "#F7E600";
const KAKAO_BROWN = "#964B00";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const ShareViaKakao = ({ onClick }: any) => {
  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    toast("화면을 클릭해 친구에게 카카오톡 알림을 전송해주세요.");
    const app = new App();
    return () => app.destroy();
  }, []);
  return (
    <>
      <div
        id="CanvasWrapper"
        onClick={onClick}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: `${windowWidth}px`,
          height: `${windowHeight}px`,
          zIndex: 50,
        }}
      />
      <img id="source" src={Kakao} alt="Kakao" style={{ opacity: 0 }} />
    </>
  );
};

class App {
  canvas: any;
  ctx: any;
  wrapper: any;
  stageWidth: any;
  stageHeight: any;

  rows: any;
  cols: any;

  text: any;
  imgSource: any;

  //state manager
  resizeEvent: any;
  drawState: any;
  animationRequest: any;

  //time manager
  now: any;
  then: any;

  constructor() {
    this.text = "Kakao";

    this.canvas = document.createElement("canvas");

    this.ctx = this.canvas.getContext("2d");
    this.wrapper = document.getElementById("CanvasWrapper");
    this.wrapper.appendChild(this.canvas);

    this.resizeEvent = this.drawState && window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.imgSource = document.getElementById("source");

    this.imgSource.addEventListener("load", () => {
      this.init();
    });
  }

  init() {
    this.now = Date.now();
    this.then = Date.now();
    this.ctx.fillStyle = KAKAO_YELLOW;
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.drawImage(this.imgSource, this.stageWidth * 0.25, this.stageHeight / 2 - this.stageWidth / 4, this.stageWidth * 0.5, this.stageWidth * 0.5);

    this.animate();
  }

  destroy() {
    cancelAnimationFrame(this.animationRequest);
    window.removeEventListener("resize", this.resizeEvent);
    this.canvas.remove();
  }

  animate() {
    this.now = Date.now();
    const delta = this.now - this.then;
    if (delta > 10) {
      this.draw();
      this.then = this.now;
    }
    this.animationRequest = requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    const TEXT_SET = [
      "친구에게 메시지 보내기",
      "카카오톡으로 메시지 보내기",
      "클릭",
      "클릭해서 카카오톡으로 연결",
      "클릭해주세요!",
      "카카오톡",
      "버들골 메신저",
      "축하사 화이팅",
      "클릭하면 메시지가 보내집니다.",
      "메시지를 보내지 않으면 친구에게 전달할 방법이 없어요!",
      "친구에게 소식을 전달해주세요.",
    ];
    this.ctx.globalCompositeOperation = "hard-light";

    this.ctx.save();

    this.ctx.font = `${getRandom(10, getRandom(20, 80))}px sans-serif`;
    this.ctx.fillStyle = this.ctx.strokeStyle = Math.random() < 0.4 ? KAKAO_YELLOW : KAKAO_BROWN;

    const TEXT = TEXT_SET[Math.floor(Math.random() * TEXT_SET.length)];

    this.ctx.strokeText(TEXT, getRandom(-150, this.stageWidth), getRandom(0, this.stageHeight + 30));
    // this.ctx.strokeText(TEXT, getRandom(-150, this.stageWidth), getRandom(0, this.stageHeight + 30));

    this.ctx.restore();
  }
}

export default ShareViaKakao;
