import React, { useEffect } from "react";
import { zIndex } from "@S/style";

function MouseTrail({ color }: any) {
  useEffect(() => {
    triggerMouseTrail(color);
    return () => removeMouseTrail();
  }, []);

  return null;
}

function removeMouseTrail() {
  document.querySelectorAll(".mouseTrailElement").forEach((e: any) => e.remove());
}

function triggerMouseTrail(color: any) {
  const Dot = function Dot(this: any) {
    this.x = 0;
    this.y = 0;
    this.setX = (newX: number) => {
      this.x = newX;
    };
    this.setY = (newY: number) => {
      this.y = newY;
    };

    this.node = (function createNode() {
      const n = document.createElement("div");
      n.className = "mouseTrailElement";
      n.setAttribute(
        "style",
        `
      z-index: ${zIndex.mouseTrail};
      background: hsla(${color.h}, ${color.s}%, ${color.l}%, 30%);
  `
      );
      document.body.appendChild(n);
      return n;
    })();
  } as any as { new (): any };

  Dot.prototype.draw = function drawDot() {
    this.node.style.left = `${this.x - 50}px`;
    this.node.style.top = `${this.y - 50}px`;
  };

  const dots: any[] = [];
  let mouse = { x: 100, y: 300 };
  for (let i = 0; i < 7; i++) {
    dots.push(new Dot() as any);
  }

  function draw() {
    let { x, y } = mouse;
    dots.forEach((dot: any, i: number) => {
      const nextDot = dots[i + 1] || dots[0];
      dot.setX(x);
      dot.setY(y);
      dot.draw();
      x += (nextDot.x - dot.x) * 0.8;
      y += (nextDot.y - dot.y) * 0.8;
    });
  }

  document.addEventListener("mousemove", (ev) => {
    mouse.x = ev.pageX;
    mouse.y = ev.pageY;
  });

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();
}

export default MouseTrail;
