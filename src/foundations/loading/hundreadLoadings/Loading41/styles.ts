import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  font-family: Helvetica;
  ${ContainerStyles};
  position: relative;
  background: radial-gradient(#222, black);
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  overflow: hidden;
  ${FlexCenterStyle};
  flex-direction: row;
`;

interface SquareProps {
  idx: number;
  colorA: any;
  colorB: any;
}

export const Square = styled.div<SquareProps>`
  background: linear-gradient(${({ colorA }) => colorA}, ${({ colorB }) => colorB});

  width: 2vw;
  height: 2vw;

  animation: move 20s infinite backwards;
  ${FlexCenterStyle};

  @keyframes move {
    0% {
      opacity: 0.4;
      transform: rotate(0);
    }
    15% {
      opacity: 1;
      transform: scale(1) rotate(1080deg);
    }
    70% {
      transform: scale(2) rotate(0deg);
    }

    100% {
      opacity: 0.4;
    }
  }
`;
