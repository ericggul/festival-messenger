import React, { useEffect } from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function UpperSection() {
  useEffect(() => {
    const app = new App();

    return () => app.destroy();
  }, []);

  return (
    <S.Container>
      <div
        id="CanvasWrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </S.Container>
  );
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  gridWidth: any;
  gridHeight: any;

  gridSets: any;

  animationRequest: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.gridSets = [];

    this.resize();
    this.animate();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.gridWidth = 20;
    this.gridHeight = 20;

    for (let i = -this.gridWidth * 10; i < this.stageWidth; i += this.gridWidth) {
      for (let j = -this.gridHeight * 10; j < this.stageHeight; j += this.gridHeight) {
        this.gridSets.push(new Element(i, j, this.gridWidth, this.gridHeight, this.stageHeight * ((j + this.gridHeight * 10) / this.gridHeight) ** 0.9));
      }
    }
  }

  animate() {
    console.log("animation request!");
    this.animationRequest = window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.gridSets.map((el: any, i: number) => el.draw(this.ctx));
  }

  destroy() {
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

  time: any;
  interval: any;

  constructor(x: any, y: any, width: any, height: any, interval: any) {
    this.x = x + width * getRandom(-0.5, 0.5);
    this.y = y + height * getRandom(-0.5, 0.5);
    this.width = width * getRandom(9, 20.5);
    this.height = height * getRandom(9, 20.5);
    this.time = 10000;
    this.interval = interval * getRandom(0.9, 1.1);
    this.color = 0;
    this.colorAmpl = getRandom(70, 90);
  }

  draw(ctx: any) {
    this.time++;
    this.color = Math.min(Math.sin((this.time * this.interval) / 100000) * 1.3, 1) * this.colorAmpl + 197;
    ctx.fillStyle = `rgba(${this.color}, ${this.color + 30}, ${this.color * 1.6}, 0.02)`;

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default UpperSection;

const SKY_BLUE = `hsl(197, 100%, 43%)`;
const HOT_PINK = `hsl(331, 91%, 64%)`;
