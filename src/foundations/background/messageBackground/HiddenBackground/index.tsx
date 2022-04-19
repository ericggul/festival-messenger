import React, { useEffect, useState } from "react";

import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import SimplexNoise from "simplex-noise";
import { debounce } from "@U/functions/timer";

import * as S from "./styles";

//Helper Functions
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;
const map = (n: number, start1: number, end1: number, start2: number, end2: number) => ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
const hsl2hex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: any) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `0x${f(0)}${f(8)}${f(4)}`;
};

const generateColor = (color: any) => {
  const { h, s, l } = color;
  return hsl2hex((h + getRandom(-40, 40)) % 360, Math.min(Math.max(s + getRandom(-10, 10), 0), 100), Math.min(Math.max(l + getRandom(0, 10), 0), 100));
};

export default function HiddenBackground({ color, windowWidth, windowHeight }: any) {
  const [app, setApp] = useState<any>(null);
  useEffect(() => {
    let app = new App(color);
    setApp(app);
    return () => {
      app.destroy();
    };
  }, [color]);
  return (
    <div
      id="pixi-canvas"
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: `${windowWidth}px`,
        height: `${windowHeight}px`,
        zIndex: -10,
      }}
    />
  );
}

class App {
  orbNumber: number;
  orbs: any[];
  stageWidth: any;
  stageHeight: any;
  bounds: any;

  pixiApp: any;

  color: any;

  resizeEvent: any;

  constructor(color: any) {
    this.color = color;

    this.orbNumber = 10;
    this.orbs = [];

    this.pixiApp = new PIXI.Application({
      resizeTo: window,
      backgroundAlpha: 0,
    });

    this.pixiApp.stage.filters = [new KawaseBlurFilter(30, 10, true)];

    document.getElementById("pixi-canvas")!.appendChild(this.pixiApp.view);
    this.resize();
    this.resizeEvent = window.addEventListener("resize", debounce(this.resize.bind(this), 250));
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
    this.bounds = this.setBounds();
    this.init();
  }

  setBounds() {
    const maxDist = (this.stageWidth + this.stageHeight) / 3;
    const originX = this.stageWidth / 2;
    const originY = this.stageHeight / 2;

    return {
      x: { min: originX - maxDist, max: originX + maxDist },
      y: { min: originY - maxDist, max: originY + maxDist },
    };
  }

  init() {
    for (let i = 0; i < this.orbNumber; i++) {
      let newOrb = new Orb(generateColor(this.color), this.stageWidth, this.stageHeight, this.bounds);
      this.pixiApp.stage.addChild(newOrb.graphics);
      this.orbs.push(newOrb);
    }
    this.animate();
  }

  animate() {
    this.pixiApp.ticker.add(() => {
      this.orbs.forEach((orb: any) => {
        orb.update();
        orb.render();
      });
    });
  }

  destroy() {
    if (this.pixiApp.view && document.getElementById("pixi-canvas")) {
      try {
        document.getElementById("pixi-canvas")!.removeChild(this.pixiApp.view);
      } catch (e) {}
    }
    document.removeEventListener("resize", this.resizeEvent);
    this.pixiApp.stage.destroy(true);
    this.pixiApp.ticker.destroy(true);
    this.pixiApp = null;
  }
}

class Orb {
  bounds: any;
  x: any;
  y: any;
  scale: number;

  fill: any;
  radius: any;

  xOff: number;
  yOff: number;
  inc: number;

  graphics: any;
  simplex: any;

  stageWidth: any;
  stageHeight: any;

  constructor(fill: any, stageWidth: any, stageHeight: any, bounds: any) {
    this.bounds = bounds;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = getRandom(this.bounds.x.min, this.bounds.x.max);
    this.y = getRandom(this.bounds.y.min, this.bounds.y.max);

    this.scale = 1;
    this.fill = fill;

    //random time
    this.xOff = getRandom(0, 1000);
    this.yOff = getRandom(0, 1000);

    //incremental of noise
    this.inc = 0.0005;

    //simplex noise
    this.simplex = new SimplexNoise();

    this.init();
  }

  init() {
    this.radius = getRandom((this.stageWidth + this.stageHeight) / 9, (this.stageHeight + this.stageWidth) / 4);

    //PIXI
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.5;
  }

  update() {
    const xNoise = this.simplex.noise2D(this.xOff, this.xOff);
    const yNoise = this.simplex.noise2D(this.yOff, this.yOff);
    const scaleNoise = this.simplex.noise2D(this.xOff, this.yOff);

    this.x = map(xNoise, -1, 1, this.bounds.x.min, this.bounds.x.max);
    this.y = map(yNoise, -1, 1, this.bounds.y.min, this.bounds.y.max);
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    console.log("render");
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    this.graphics.clear();

    this.graphics.beginFill(this.fill);
    this.graphics.drawCircle(0, 0, this.radius);
    this.graphics.endFill();
  }
}
