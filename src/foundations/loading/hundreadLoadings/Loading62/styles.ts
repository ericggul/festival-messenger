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
interface CircleInterface {
  idx: number;
  top: number;
  left: number;
  rotate: number;
}

export const Square = styled.div<CircleInterface>`
  position: absolute;
  width: ${({ theme }) => theme.windowWidth * 0.1}px;
  height: ${({ theme }) => theme.windowHeight * 0.1}px;

  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  box-shadow: 0 0 3rem blue;

  ${FlexCenterStyle};

  color: white;
  transform: rotate(${({ rotate }) => rotate}deg);

  animation: ${AppearAnimation} 0.5s backwards;
  animation-delay: ${({ idx }) => idx * 0.03}s;
`;
