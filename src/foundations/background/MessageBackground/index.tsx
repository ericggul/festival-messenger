import * as S from "./styles";
import { useCallback, useState, useEffect, useRef } from "react";

import ReactAudioPlayer from "react-audio-player";
import useResize from "@/utils/hooks/useResize";

const Reality = require("../../../static/assets/audio/Reality.mp3");

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

interface MessageBackgroundType {
  color?: any;
  audio?: any;
}

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

// { h: 184, s: 20, l: 46 }

export default function MessageBackground({ color = { h: 130, s: 20, l: 48 }, audio }: MessageBackgroundType) {
  const [rap, setRap] = useState<any>(!null);
  const [wave, setWave] = useState<any>(!null);

  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    if (rap && rap.audioEl) {
      let canvasEl = new App(rap.audioEl.current, color);
      canvasEl.audioCtx.resume();
      setWave(canvasEl);
    }
  }, [rap]);

  //To Do: Handle when audio is changed!!
  useEffect(() => {
    if (audio) {
    }
    if (wave && wave.audioCtx) {
      let canvasEl = new App(rap.audioEl.current, color);
      canvasEl.audioCtx.resume();
      setWave(canvasEl);
    }
  }, [audio]);

  console.log(audio);

  return (
    <>
      <S.Container color={color} />
      {audio && <ReactAudioPlayer src={Reality} autoPlay ref={(el) => setRap(el)} />}
      {audio && (
        <div
          id="CanvasWrapper"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: `${windowWidth}px`,
            height: `${windowHeight}px`,
            zIndex: 5,
          }}
        />
      )}
    </>
  );
}

class App {
  canvas: any;
  ctx: any;
  wrapper: any;

  audioElement: any;
  analyser: any;
  audioCtx: any;
  source: any;

  data: any;

  stageWidth: any;
  stageHeight: any;
  space: any;
  columnNums: any;
  rowNums: any;
  columnWidth: any;
  rowHeight: any;
  cellSize: any;

  pointArray: any;

  time: any;

  color: any;

  constructor(audioElement: any, color: any) {
    this.color = color;

    this.canvas = document.createElement("canvas");

    this.ctx = this.canvas.getContext("2d");
    this.wrapper = document.getElementById("CanvasWrapper");
    this.wrapper.appendChild(this.canvas);
    this.time = 0;

    this.audioElement = audioElement;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();

    this.analyser.fftSize = 512;
    // this.analyser.smoothingTimeConstant = 0.95;

    this.source = this.audioCtx.createMediaElementSource(this.audioElement);
    this.data = new Uint8Array(this.analyser.frequencyBinCount);

    this.source.connect(this.analyser);
    this.source.connect(this.audioCtx.destination);

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;
    this.space = this.stageWidth / this.stageHeight;

    this.pointArray = [];

    this.sizeCalculator();

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.init();
  }

  sizeCalculator() {
    if (this.space > 3) {
      this.columnNums = 64;
      this.rowNums = 16;
    } else if (this.space > 1.4) {
      this.columnNums = 40;
      this.rowNums = 25;
    } else if (this.space > 0.75) {
      this.columnNums = 32;
      this.rowNums = 32;
    } else if (this.space > 0.34) {
      this.columnNums = 25;
      this.rowNums = 40;
    } else {
      this.columnNums = 16;
      this.rowNums = 64;
    }
    this.columnWidth = this.stageWidth / this.columnNums;
    this.rowHeight = this.stageHeight / this.rowNums;
    this.cellSize = Math.min(this.columnWidth, this.rowHeight);
  }

  init() {
    for (let i = 0; i < 257; i++) {
      this.pointArray.push(new Point(this.stageWidth, this.stageHeight, this.color, this.cellSize * 10));
    }

    this.loopingFunction();
  }

  loopingFunction() {
    this.time++;
    requestAnimationFrame(this.loopingFunction.bind(this));
    this.analyser.getByteFrequencyData(this.data);
    this.draw(this.data);
  }

  draw(data: any) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    data.forEach((value: any, i: number) => {
      this.pointArray[i].draw(this.ctx, value);
    });
  }
}

class Point {
  x: any;
  y: any;
  color: any;
  baseColor: any;
  fillColor: any;

  centerX: any;
  centerY: any;

  radius: any;
  angle: any;
  angleSpeed: any;

  cellSize: any;
  constructor(width: any, height: any, color: any, cellSize: any) {
    this.x = getRandom(width * 0.15, width * 0.85);
    this.y = getRandom(height * 0.15, height * 0.85);

    this.centerX = width * 0.5;
    this.centerY = height * 0.5;

    //get distance from this.x, this.y to this.centerX, this.centerY

    this.radius = Math.sqrt((this.x - this.centerX) ** 2 + (this.y - this.centerY) ** 2);
    this.angle = Math.atan2(this.y - this.centerY, this.x - this.centerX);
    this.angleSpeed = getRandom(-0.001, 0.001);

    this.color = color;
    this.baseColor = `hsla(${color.h}, ${color.s}%, ${color.l}%, 0.6)`;
    this.fillColor = `hsla(${color.h},  ${getRandom(color.s - 5, color.s + 5)}%, ${getRandom(70, 100)}%, 1)`;
    this.cellSize = cellSize;
  }
  //`hsla(${this.color.h},  ${getRandom(this.color.s - 5, this.color.s + 5)}%, ${getRandom(90, 100)}%, 1)`;

  draw(ctx: any, value: any) {
    this.angle += (this.angleSpeed * value) / 255;

    let xPos = this.centerX + this.radius * Math.cos(this.angle);
    let yPos = this.centerY + this.radius * Math.sin(this.angle);
    const size = (value / 255) * 1.5;
    ctx.beginPath();

    // Set the fill style and draw a rectangle
    ctx.fillStyle = this.fillColor;
    ctx.arc(xPos, yPos, size, 0, Math.PI * 2, false);

    ctx.fill();
    ctx.closePath();
  }
}
