import React, { useMemo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";
import e from "cors";

//colors
const KAKAO_YELLOW = "#F7E600";
const KAKAO_BROWN = "#964B00";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const ShareViaKakao = ({ onClick }: any) => {
  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    const app = new App();
    return () => app.destroy();
  }, []);
  return (
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
  );
};

class App {
  canvas: any;
  ctx: any;
  wrapper: any;
  stageWidth: any;
  stageHeight: any;

  cellSize: any;
  rows: any;
  cols: any;

  text: any;

  //state manager
  resizeEvent: any;
  drawState: any;

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

    this.cellSize = (this.stageWidth * this.stageHeight) / 200000;

    this.init();
  }

  init() {
    this.draw();
  }

  destroy() {}

  draw() {
    this.rows = Math.floor(this.stageHeight / this.cellSize);
    this.cols = Math.floor(this.stageWidth / this.cellSize);

    this.ctx.fillStyle = KAKAO_YELLOW;
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    //glyphs
    const fontSize = this.cols * 0.3;
    this.ctx.fillStyle = KAKAO_BROWN;
    this.ctx.font = `${fontSize}px Times New Roman`;
    this.ctx.textBaseline = "top";

    const metrics = this.ctx.measureText(this.text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (this.cols - mw) * 0.5 - mx;
    const ty = (this.rows - mh) * 0.5 - my;

    this.ctx.save();
    this.ctx.translate(tx, ty);
    this.ctx.beginPath();
    // this.ctx.rect(mx, my, mw, mh);
    this.ctx.stroke();

    this.ctx.fillText(this.text, 0, 0);
    this.ctx.restore();

    const typeData = this.ctx.getImageData(0, 0, this.cols, this.rows).data;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.textBaseline = "midde";
    this.ctx.textAlign = "center";

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const index = (i * this.cols + j) * 4;
        const r = typeData[index];
        const g = typeData[index + 1];
        const b = typeData[index + 2];
        const a = typeData[index + 3];

        const glyph = getGlpyh(r);

        this.ctx.font = `${this.cellSize * 4}px Times New Roman`;
        this.ctx.fillStyle = Math.random() < 0.7 ? KAKAO_YELLOW : KAKAO_BROWN;

        const x = j * this.cellSize;
        const y = i * this.cellSize;
        const w = this.cellSize;
        const h = this.cellSize;

        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.translate(w * 0.5, h * 0.5);
        this.ctx.fillText(glyph, 0, 0);
        this.ctx.restore();
      }
    }
  }
}

const getGlpyh = (v: any) => {
  const letters = "KAKAO".split("");
  if (v < 200) return letters[Math.floor(Math.random() * letters.length)];

  const glyphs = "_= /".split("");
  return "@";
};

export default ShareViaKakao;
