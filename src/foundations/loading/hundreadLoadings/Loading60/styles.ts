import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};
  position: relative;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  text-align: center;
  flex-direction: column;
  background: radial-gradient(white, hotpink);
`;
interface CircleInterface {
  top: number;
  left: number;
  size: number;
  rotate: number;
}

export const Circle = styled.div<CircleInterface>`
  mix-blend-mode: difference;
  font-family: Times New Roman;
  position: absolute;
  width: 10vh;
  height: 10vh;
  border-radius: 50%;

  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  ${FlexCenterStyle};
  text-align: center;
  color: white;
  font-size: ${({ size }) => size}vh;
  transform: rotate(${({ rotate }) => rotate}deg);
  font-weight: 800;

  // animation: rotate 10s infinite linear;
  // animation-delay:
  // @keyframes rotate{
  //   0%{
  //     transform: rotate(0deg);
  //   }
  //   50%{
  //     transfrom: rotate(180deg);
  //   }
  // }
`;
