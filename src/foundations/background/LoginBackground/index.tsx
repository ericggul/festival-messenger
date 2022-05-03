import { useEffect } from "react";
import useResize from "@U/hooks/useResize";
import { debounce } from "@U/functions/timer";
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Texture() {
  const [windowWidth, windowHeight] = useResize();
  useEffect(() => {
    const draw = new Canvas();

    return () => draw && draw.destroy();
  }, []);

  return (
    <div
      id="CanvasWrapper4"
      style={{
        position: "absolute",
        top: -20,
        left: 0,
        width: windowWidth,
        height: windowHeight * 1.2,
        zIndex: 0,

        overflow: "hidden",
      }}
    />
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  interval: any;

  resizeEvent: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper4");
    this.canvas = document.createElement("canvas");
    this.canvas.style.zIndex = 0;
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    this.resizeEvent = window.addEventListener("resize", this.resize.bind(this));
  }

  destroy() {
    window.removeEventListener("resize", this.resize.bind(this));
    this.wrapper.removeChild(this.canvas);
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    console.log(this.stageWidth);
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.interval = Math.max(Math.round(Math.sqrt(((this.stageWidth * this.stageHeight) / (1280 * 720)) * 200)) / 100, 1);

    this.ctx.scale(1, 1);
    this.init();
  }

  init() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
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
