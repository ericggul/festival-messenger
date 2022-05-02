import React, { useEffect } from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";
import UpperSection from "@C/about/UpperSection";
import MiddleSection from "@C/about/MiddleSection";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function About() {
  useEffect(() => {
    const app = new App();
    return () => app.destroy();
  }, []);

  const [windowWidth, windowHeight] = useResize();
  return (
    <S.Background>
      <div
        id="CanvasWrapper"
        style={{
          width: windowWidth,
          height: 2 * windowHeight,
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          filter: "blur(1px)",
          margin: 0,
          padding: 0,
        }}
      />

      <UpperSection />
      <MiddleSection />
    </S.Background>
  );
}
export default About;

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  gridWidth: any;
  gridHeight: any;

  gridSets: any;

  resizeEvent: any;
  animationRequest: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.gridSets = [];

    this.resize();
    this.resizeEvent = document.addEventListener("resize", this.resize.bind(this));
    this.animate();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.gridWidth = (this.stageWidth + this.stageHeight) / 200;
    this.gridHeight = (this.stageWidth + this.stageHeight) / 200;

    for (let i = 0; i < this.stageWidth; i += this.gridWidth * 2) {
      for (let j = 0; j < this.stageHeight; j += this.gridHeight * 2) {
        this.gridSets.push(new Element(i, j, this.gridWidth, this.gridHeight, this.stageHeight));
      }
    }
  }

  animate() {
    this.animationRequest = window.requestAnimationFrame(this.animate.bind(this));
    // this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.gridSets.map((el: any, i: number) => el.draw(this.ctx));
  }

  destroy() {
    document.removeEventListener("resize", this.resizeEvent);
    window.cancelAnimationFrame(this.animationRequest);
  }
}

class Element {
  x: any;
  y: any;

  width: any;
  height: any;

  color: any;
  colorAmpl: any;

  colorStart: any;
  colorMultiply: any;

  time: any;

  angle: any;
  angleSpeed: any;

  constructor(x: any, y: any, width: any, height: any, stageHeight: any) {
    this.x = x + width * getRandom(-0.5, 0.5);
    this.y = y + height * getRandom(-0.5, 0.5);
    this.width = width * getRandom(9, 20.5);
    this.height = height * getRandom(9, 20.5);
    this.time = 10000;

    this.color = 0;
    this.colorAmpl = getRandom(-100, 100);
    this.colorStart = getRandom(0, 40);

    this.angle = getRandom(0, Math.PI * 2);
    this.angleSpeed = getRandom(-0.007, 0.007);

    console.log(this.y / stageHeight);
    this.colorMultiply = {
      r: 0.9 + (y / stageHeight) * getRandom(0.6, 1.3) + getRandom(-0.3, 0.3),
      g: getRandom(0.6, 0.9),
      b: 1.6 - (this.y / stageHeight) * getRandom(0.2, 0.8),
    };
  }

  draw(ctx: any) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.angle += this.angleSpeed;
    this.time++;
    this.color = this.colorStart + Math.sin(this.time / 500) * this.colorAmpl + 120;
    ctx.fillStyle = `rgba(${this.color * this.colorMultiply.r}, ${this.color * this.colorMultiply.g}, ${this.color * this.colorMultiply.b}, 0.017)`;

    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
