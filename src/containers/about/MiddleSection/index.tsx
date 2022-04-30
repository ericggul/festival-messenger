import React from "react";
import * as S from "./styles";

import Heart from "@I/icons/about/heart.svg";
import useResize from "@U/hooks/useResize";

import { FaReact, FaSass, FaGithub, FaLinkedin, FaPalette } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Fade = require("react-reveal/Fade");
const Swing = require("react-reveal/Swing");
const LightSpeed = require("react-reveal/LightSpeed");
const Bounce = require("react-reveal/Bounce");
const Wobble = require("react-reveal/Wobble");
const Zoom = require("react-reveal/Zoom");

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Contact() {
  return (
    <S.ContactContainer>
      <S.IconContainer>
        <S.AIcon>
          <a href="https://github.com/ericggul" target="_blank" rel="noreferrer" style={{ color: "black", textDecoration: "none" }}>
            <FaGithub />
          </a>
        </S.AIcon>
        <S.AIcon>
          <a href="https://www.linkedin.com/in/jeanyoonchoi/" target="_blank" rel="noreferrer" style={{ color: "black", textDecoration: "none" }}>
            <FaLinkedin />
          </a>
        </S.AIcon>
        <S.AIcon>
          <a href="https://laboratory-occupied.com" target="_blank" rel="noreferrer" style={{ color: "black", textDecoration: "none" }}>
            <FaPalette />
          </a>
        </S.AIcon>
        <S.AIcon>
          <a href="http://portfolio-jyc.org" target="_blank" rel="noreferrer" style={{ color: "black", textDecoration: "none" }}>
            <CgWebsite />
          </a>
        </S.AIcon>
      </S.IconContainer>

      <S.Text>Email: ericggul@gmail.com</S.Text>
    </S.ContactContainer>
  );
}

function MiddleSection() {
  const [windowWidth, windowHeight] = useResize();

  //contact me section
  return (
    <S.Container>
      <S.TextContainer>
        <LightSpeed delay={300}>
          <S.Designed>Designed</S.Designed>
        </LightSpeed>

        <Fade right duration={300} delay={700}>
          <Swing duration={1300} delay={700}>
            <S.And>{"&"}</S.And>
          </Swing>
        </Fade>

        <Bounce bottom duration={1000} delay={1000}>
          <S.Developed>Developed</S.Developed>
        </Bounce>

        <Fade duration={500} delay={1500}>
          <S.By>by</S.By>
        </Fade>

        <Zoom right delay={1500} duration={1000}>
          <S.JYC>JYC</S.JYC>
        </Zoom>
      </S.TextContainer>
      <Contact />
    </S.Container>
  );
}
export default MiddleSection;
