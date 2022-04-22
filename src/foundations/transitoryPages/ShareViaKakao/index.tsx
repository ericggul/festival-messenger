import React, { useMemo, useCallback, useEffect, useState } from "react";
import * as S from "./styles";

import useResize from "@U/hooks/useResize";

import KakaoIcon from "@I/icons/kakao/kakao.svg";

//p5
import Sketch from "react-p5";
import p5Types from "p5";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

// const KakaoIcon = () => {
//   const brownColor = useMemo(() => `hsl(29, 100%, ${getRandom(25, 35)}%)`, []);
//   const scale = useMemo(() => 2, []);
//   //originally -149
//   const rotate = useMemo(() => getRandom(0, 360), []);

//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} transform={`rotate(${rotate}) scale(${scale})`}>
//       <g id="그룹_6" data-name="그룹 6" transform="translate(-167 -652)">
//         <circle id="타원_1" data-name="타원 1" cx="17" cy="17" r="17" transform="translate(167 652)" style={{ fill: "hsl(56, 100%, 48%)" }} />
//         <ellipse id="타원_2" data-name="타원 2" style={{ fill: brownColor }} cx="10.077" cy="8.061" rx="10.077" ry="8.061" transform="translate(173.852 659.622)" />
//         <path id="다각형_1" data-name="다각형 1" style={{ fill: brownColor }} d="m4.6 0 4.6 12.026H0z" transform={`rotate(-149 185.425 315.762)`} />
//       </g>
//     </svg>
//   );
// };

const P5Container = () => {
  const [windowWidth, windowHeight] = useResize();
  const y = 0;

  const [particleTexture, setParticleTexture] = useState<any>(null);
  const [p5, setP5] = useState<any>(null);
  const [ps, setPs] = useState<any>(null);

  const preload = (p5: p5Types) => {
    let img = p5.loadImage("./assets/images/kakao.svg");
    setParticleTexture(img);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    setP5(p5);
    console.log(particleTexture);
    setPs(new ParticleSystem(p5, 0, p5.createVector(windowWidth / 2, windowHeight - 60), particleTexture));
    p5.createCanvas(windowWidth, windowHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    let dx = p5.map(p5.mouseX, 0, p5.width, -0.2, 0.2);
    let wind = p5.createVector(dx, 0);

    ps.applyForce(wind);
    ps.run();
    for (let i = 0; i < 2; i++) {
      ps.addParticle();
    }
  };

  ///Particle system Interface
  interface ParticleSystem {
    p5: any;
    particles: any;
    origin: any;
    img: any;
    run(): void;
    applyForce(): void;
    addParticle(): void;
  }

  interface ParticleSystemConstructor {
    new (p5: any, num: any, v: any, img_: any): ParticleSystem;
    (): void;
  }

  let ParticleSystem = function (this: ParticleSystem, p5: any, num: any, v: any, img_: any) {
    this.p5 = p5;

    this.particles = [];
    this.origin = v.copy();
    this.img = img_;
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.p5, this.origin, this.img));
    }
  } as ParticleSystemConstructor;

  ParticleSystem.prototype.run = function () {
    let len = this.particles.length;

    for (let i = len - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();

      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

  ParticleSystem.prototype.applyForce = function (dir: any) {
    let len = this.particles.length;
    for (let i = 0; i < len; i++) {
      this.particles[i].applyForce(dir);
    }
  };

  ParticleSystem.prototype.addParticle = function () {
    this.particles.push(new Particle(this.p5, this.origin, this.img));
  };

  //Particle interface
  interface Particle {
    p5: any;
    loc: number;
    vel: number;
    acc: number;
    lifespan: number;
    texture: any;

    run(): void;
    render(): void;
    applyForce(f: any): void;
    isDead(): void;
    update(): void;
  }

  interface ParticleConstructor {
    new (p5: any, pos: any, img_: any): Particle;
    (): void;
  }

  let Particle = function (this: Particle, p5: any, pos: any, img_: any) {
    this.loc = pos.copy();

    this.p5 = p5;

    let vx = this.p5.randomGaussian() * 0.3;
    let vy = this.p5.randomGaussian() * 0.1 - 1.0;
    this.vel = this.p5.createVector(vx, vy);
    this.acc = this.p5.createVector(0, 0);

    this.lifespan = 100.0;
    this.texture = img_;
  } as ParticleConstructor;

  Particle.prototype.run = function () {
    this.update();
    this.render();
  };

  Particle.prototype.render = function () {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.tint(255, this.lifespan);
    this.p5.image(this.texture, this.loc.x, this.loc.y);
  };

  Particle.prototype.applyForce = function (f: any) {
    this.acc.add(f);
  };

  Particle.prototype.isDead = function () {
    if (this.lifespan <= 0.0) {
      return true;
    } else {
      return false;
    }
  };

  Particle.prototype.update = function () {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= 2.5;
    this.acc.mult(0);
  };

  //utils: window resizing
  const windowResized = () => {
    if (p5) {
      p5.resizeCanvas(windowWidth, windowHeight);
    }
  };

  useEffect(() => {
    windowResized();
  }, [windowWidth, windowHeight]);

  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

function ShareViaKakao() {
  return (
    <S.Container>
      <P5Container />
    </S.Container>
  );
}
export default ShareViaKakao;
