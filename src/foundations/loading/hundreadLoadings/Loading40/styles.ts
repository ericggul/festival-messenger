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
  color: any;
}

export const Square = styled.div<SquareProps>`
  background: linear-gradient(${({ color }) => color}, pink);

  margin-bottom: ${({ idx }) => (idx - 25) * 10}px;
  border-radius: 50%;

  width: ${({ idx }) => (Math.abs(idx - 25) + 40) * 0.035}vw;
  height: ${({ idx }) => (Math.abs(idx - 25) + 40) * 0.035}vw;

  animation: move 3s infinite backwards;
  animation-delay: ${({ idx }) => (Math.abs(idx - 25) * 1.2) / 51}s;

  ${FlexCenterStyle};

  @keyframes move {
    0% {
      opacity: 0;
      transform: scale(2) rotate(0);
    }
    15% {
      opacity: 1;
      transform: scale(1);
    }
    70% {
      opacity: 1;
      transform: scale(2) rotate(360deg);
    }

    100% {
      opacity: 0;
    }
  }
`;
