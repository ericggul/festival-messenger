import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};
  position: relative;
  background: radial-gradient(#222, black);
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  overflow: hidden;
  ${FlexCenterStyle};
  flex-direction: column;
  background: #f7d2d2;
`;

interface SquareProps {
  idx: number;
}

export const Square = styled.div<SquareProps>`
  font-size: 5rem;
  font-weight: bold;
  width: 100%;

  ${FlexCenterStyle};
  color: white;

  animation: change 4s infinite linear;
  animation-delay: ${({ idx }) => -(idx * 0.5) / 20}s;

  @keyframes change {
    0% {
      background: #f7d2d2;
    }
    25% {
      background: #d2daf7;
    }
    50% {
      background: #d2f7ec;
    }
    75% {
      background: #e7d2f7;
    }
    100% {
      background: #f7d2d2;
    }
  }
`;
