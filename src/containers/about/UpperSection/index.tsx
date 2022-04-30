import React, { useEffect } from "react";
import * as S from "./styles";

const Fade = require("react-reveal/Fade");
const Swing = require("react-reveal/Swing");
const LightSpeed = require("react-reveal/LightSpeed");
const Bounce = require("react-reveal/Bounce");
const Wobble = require("react-reveal/Wobble");
const Zoom = require("react-reveal/Zoom");

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
          opacity: 0.7,
        }}
      />
      <S.Contents>
        <S.Intro>
          <Fade delay={1000}>
            <p>어디서든 보낼 수 있지만, 버들골에서만 읽을 수 있는 네 마음!</p>
          </Fade>
          <Fade delay={1800}>
            <p>SNUFESTIVAL: 홈커밍에서 메신저를 열어보세요!</p>
          </Fade>
        </S.Intro>

        <Zoom delay={3000}>
          <S.Expl>
            <h2>사용방법</h2>
            <p>1. 지도에 가서 메시지를 보낼 장소에 핀을 찍으세요.</p>
            <p>2. 메시지를 보낼 친구를 고르고, 메시지를 작성해주세요.</p>
            <p>3. 작성 완료 후, 친구에게 카카오톡 알림이 전송됩니다.</p>
            <p>4. 친구는 핀으로부터 50m 내에서만 메시지를 읽어볼 수 있습니다.</p>
          </S.Expl>
        </Zoom>
      </S.Contents>
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

    this.gridWidth = (this.stageWidth + this.stageHeight) / 70;
    this.gridHeight = (this.stageWidth + this.stageHeight) / 70;

    for (let i = 0; i < this.stageWidth; i += this.gridWidth) {
      for (let j = 0; j < this.stageHeight; j += this.gridHeight) {
        this.gridSets.push(new Element(i, j, this.gridWidth, this.gridHeight, this.stageHeight * ((j + this.gridHeight * 10) / this.gridHeight) ** 0.9));
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

  time: any;
  interval: any;

  angle: any;

  constructor(x: any, y: any, width: any, height: any, interval: any) {
    this.x = x + width * getRandom(-0.5, 0.5);
    this.y = y + height * getRandom(-0.5, 0.5);
    this.width = width * getRandom(9, 20.5);
    this.height = height * getRandom(9, 20.5);
    this.time = 10000;
    this.interval = interval * getRandom(0.9, 1.1);
    this.color = 0;
    this.colorAmpl = getRandom(70, 90);

    this.angle = getRandom(0, Math.PI * 2);
  }

  draw(ctx: any) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.time += 0.1;
    this.color = Math.min(Math.sin((this.time * this.interval) / 100000) * 1.3, 1) * this.colorAmpl + 197;
    ctx.fillStyle = `rgba(${this.color}, ${this.color + 30}, ${this.color * getRandom(1.5, 1.6)}, 0.02)`;

    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}

export default UpperSection;

const SKY_BLUE = `hsl(197, 100%, 43%)`;
const HOT_PINK = `hsl(331, 91%, 64%)`;
