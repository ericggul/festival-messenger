import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};

  font-family: Courier New;
  position: relative;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  text-align: center;
  flex-direction: column;
  background: black;
`;

interface BoxInterface {
  top: number;
  left: number;
  idx: number;
  angle: number;
  size: number;
}

export const Box = styled.div<BoxInterface>`
  position: absolute;
  ${FlexCenterStyle};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  color: white;

  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  font-size: 1.5rem;

  animation: ${AppearAnimation} 0.25s backwards;
  animation-delay: ${({ idx }) => idx * 0.25}s;

  transform: rotate(${({ angle }) => angle}deg);
`;