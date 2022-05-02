import React, { useEffect, useRef } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import useResize from "@U/hooks/useResize";

const Fade = require("react-reveal/Fade");

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function UpperSection() {
  const [windowWidth, windowHeight] = useResize();

  const navigate = useNavigate();

  const headerRef1 = useRef<any>(!null);
  const textRef1 = useRef<any>(!null);
  const headerRef2 = useRef<any>(!null);
  const textRef2 = useRef<any>(!null);
  const headerRef3 = useRef<any>(!null);

  function typeWriter(text: string, i: number, ref: any) {
    if (i < text.length) {
      ref.current.textContent += text.charAt(i);
      if (text.charAt(i) == " ") {
        ref.current.textContent += " ";
      }
      setTimeout(() => typeWriter(text, i + 1, ref), getRandom(75, 150));
    }
  }

  useEffect(() => {
    let timeout1: any;
    let timeout2: any;
    let timeout3: any;
    let timeout4: any;
    let timeout5: any;
    if (headerRef1 && textRef1 && headerRef2 && textRef2 && headerRef3) {
      timeout1 = setTimeout(() => typeWriter("어디서든", 0, headerRef1), 500);
      timeout2 = setTimeout(() => typeWriter("보낼 수 있지만", 0, textRef1), 1500);
      timeout3 = setTimeout(() => typeWriter("버들골에서만", 0, headerRef2), 3000);
      timeout4 = setTimeout(() => typeWriter("읽을 수 있는", 0, textRef2), 4200);
      timeout5 = setTimeout(() => typeWriter("시크릿 메신저", 0, headerRef3), 5500);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        clearTimeout(timeout5);
      };
    }
  }, [headerRef1, headerRef2, headerRef3, textRef1, textRef2]);

  return (
    <S.Container>
      <S.UpperPart>
        <S.SingleClause>
          <S.Header ref={headerRef1} />
          <S.Text ref={textRef1} />
        </S.SingleClause>
        <S.SingleClause>
          <S.Header ref={headerRef2} />
          <S.Text ref={textRef2} />
        </S.SingleClause>
        <S.SingleClause>
          <S.Header ref={headerRef3} />
        </S.SingleClause>
      </S.UpperPart>
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
