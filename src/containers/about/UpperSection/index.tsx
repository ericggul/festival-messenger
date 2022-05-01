import React, { useEffect } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import useResize from "@U/hooks/useResize";

const Fade = require("react-reveal/Fade");

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function UpperSection() {
  const [windowWidth, windowHeight] = useResize();

  const navigate = useNavigate();
  return (
    <S.Container>
      <S.UpperPart>
        <S.SingleClause>
          <Fade delay={500}>
            <S.Header>어디서든</S.Header>
          </Fade>
          <Fade delay={1000}>
            <S.Text>보낼 수 있겠지만</S.Text>
          </Fade>
        </S.SingleClause>
        <S.SingleClause>
          <Fade delay={1800}>
            <S.Header>버들골에서만</S.Header>
          </Fade>
          <Fade delay={2300}>
            <S.Text>읽을 수 있는</S.Text>
          </Fade>
        </S.SingleClause>
        <S.SingleClause>
          <Fade delay={3100}>
            <S.Header>시크릿 메신저</S.Header>
          </Fade>
        </S.SingleClause>
      </S.UpperPart>
      <Fade delay={4000}>
        <S.Button
          onClick={() =>
            navigate("/map", {
              state: {
                focusAddMessageButton: true,
              },
            })
          }
        >
          지금 메시지 작성하기
        </S.Button>
      </Fade>
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

  resizeEvent: any;
  animationRequest: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resizeEvent = document.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.animate();
  }

  resize() {
    this.gridSets = [];
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.gridWidth = (this.stageWidth + this.stageHeight) / 100;
    this.gridHeight = (this.stageWidth + this.stageHeight) / 100;

    for (let i = 0; i < this.stageWidth; i += this.gridWidth) {
      for (let j = 0; j < this.stageHeight; j += this.gridHeight) {
        this.gridSets.push(new Element(i, j, this.gridWidth, this.gridHeight, this.stageHeight * ((this.gridHeight * 10) / this.gridHeight) ** 0.9));
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
  colorOrigin: any;
  colorAmpl: any;

  rgbTransform: any;

  time: any;
  interval: any;

  angle: any;

  constructor(x: any, y: any, width: any, height: any, interval: any) {
    this.x = x + width * getRandom(-0.5, 0.5);
    this.y = y + height * getRandom(-0.5, 0.5);
    this.width = width * getRandom(9, 20.5);
    this.height = height * getRandom(9, 20.5);
    this.time = 10000;
    this.interval = interval * getRandom(0.7, 1.3);
    this.color = getRandom(0, 50);
    this.colorOrigin = getRandom(0, 20);
    this.colorAmpl = getRandom(-110, 110);

    this.rgbTransform = { r: getRandom(1.2, 1.42), g: getRandom(0.8, 0.9), b: getRandom(1.1, 1.4) };

    this.angle = getRandom(0, Math.PI * 2);
  }

  draw(ctx: any) {
    this.angle += 0.001;
    this.time++;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    this.color = this.colorOrigin + Math.sin((this.time * this.interval) / 2000000) * this.colorAmpl + 112;
    ctx.fillStyle = `rgba(${this.color * this.rgbTransform.r}, ${this.color * this.rgbTransform.g}, ${this.color * this.rgbTransform.b}, 0.02)`;

    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}

export default UpperSection;
