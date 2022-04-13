import { useEffect } from "react";
import useResize from "@U/hooks/useResize";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Texture() {
  const [windowWidth, windowHeight] = useResize();
  useEffect(() => {
    const draw = new Canvas();

    return () => draw && draw.destroy();
  }, []);

  return <div id="CanvasWrapper" style={{ position: "absolute", top: 0, left: 0, width: windowWidth, height: windowHeight, zIndex: 0 }} />;
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  interval: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.canvas.style.zIndex = 0;
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  destroy() {
    this.wrapper.removeChild(this.canvas);
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.interval = 1;

    this.ctx.scale(1, 1);
    this.init();
  }

  init() {
    for (let i = 0; i < Math.ceil(this.stageWidth / this.interval); i++) {
      for (let j = 0; j < Math.ceil(this.stageHeight / this.interval); j++) {
        this.ctx.beginPath();
        this.ctx.fillRect(i * this.interval, j * this.interval, this.interval, this.interval);
        this.ctx.fillStyle = `hsl(50, ${getRandom(50, 100)}%, ${getRandom(50, 95)}%)`;
      }
    }
  }
}

export default Texture;
