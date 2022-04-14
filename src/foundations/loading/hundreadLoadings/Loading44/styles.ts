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
  flex-direction: column;
`;

interface SquareProps {
  idx: number;
}

export const Square = styled.div<SquareProps>`
  font-size: 5rem;
  font-weight: bold;
  width: 100%;
  height: 6%;
  ${FlexCenterStyle};
  color: white;

  animation: change 4s infinite linear;
  animation-delay: ${({ idx }) => -(idx * 0.5) / 20}s;

  @keyframes change {
    0% {
      background: #ffaa3c;
    }
    25% {
      background: #e6447d;
    }
    50% {
      background: #652e79;
    }
    75% {
      background: #4bd4d4;
    }
    100% {
      background: #ffaa3c;
    }
  }
`;
