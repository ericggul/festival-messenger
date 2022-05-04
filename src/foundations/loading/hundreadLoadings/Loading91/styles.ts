import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  font-family: Helvetica;
  ${ContainerStyles};
  position: relative;
  background: black;

  font-size: 20vh;
  color: white;

  flex-direction: row;
  font-weight: 800;
  text-transform: uppercase;

  overflow: hidden;
  ${FlexCenterStyle};

  animation: ${AppearAnimation} 1s;
`;

interface LocProps {
  top: any;
  left: any;
  delay: any;
  size: any;
}

export const Box = styled.div<LocProps>`
  mix-blend-mode: difference;
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  margin-top: ${({ size }) => -size * 0.5}rem;
  margin-left: ${({ size }) => -size * 0.5}rem;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  background: rgb(250, 200, 100);

  animation: move-rotate 7s infinite linear;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes move-rotate {
    0% {
      transform: rotate(0deg);
    }
    12.5% {
      transform: rotate(90deg);
    }
    25% {
      transform: rotate(90deg);
    }
    37.5% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(180deg);
    }
    62.5% {
      transform: rotate(270deg);
    }
    75% {
      transform: rotate(270deg);
    }
    87.5% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface DelayProps {
  delay: any;
  size: any;
}

export const InnerBox = styled.div<DelayProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ size }) => size}rem;
  background: rgb(100, 40, 200);

  animation: fill-in 3.5s infinite linear;
  animation-delay: ${({ delay }) => delay}s;
  @keyframes fill-in {
    0% {
      height: 0;
    }
    25% {
      height: 0;
    }
    50% {
      height: 20rem;
    }
    75% {
      height: 20rem;
    }
    100% {
      height: 0;
    }
  }
`;
