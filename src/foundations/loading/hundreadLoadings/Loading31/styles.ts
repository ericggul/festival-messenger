import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  font-family: Helvetica;
  ${ContainerStyles};
  position: relative;
  background: #444;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  overflow: hidden;
  ${FlexCenterStyle};
  flex-direction: row;
`;

interface SquareProps {
  idx: number;
}

export const Square = styled.div<SquareProps>`
  background: white;
  width: 10vw;
  height: 10vw;
  margin: 2vw;

  animation: move 3s infinite backwards;
  animation-delay: ${({ idx }) => (idx * 0.7) / 6}s;

  ${FlexCenterStyle};

  @keyframes move {
    0% {
      opacity: 0;
    }
    15% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;
