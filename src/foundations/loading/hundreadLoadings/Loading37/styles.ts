import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  font-family: Helvetica;
  ${ContainerStyles};
  position: relative;
  background: black;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  overflow: hidden;
  ${FlexCenterStyle};
  flex-direction: row;
`;

export const RowAlign = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100%;
  ${FlexCenterStyle};
  flex-direction: row;
`;
export const ColAlign = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  ${FlexCenterStyle};
  flex-direction: column;
`;

interface SquareProps {
  idx: number;
}

export const Square = styled.div<SquareProps>`
  background: white;

  width: 0.7vw;
  height: 0.7vw;
  margin: 0.1vw;

  animation: move 3s infinite backwards;
  animation-delay: ${({ idx }) => (Math.abs(idx - 50) * 1.2) / 101}s;

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
