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
}

export const Square = styled.div<SquareProps>`
  width: 50%;
  height: 100%;
  ${FlexCenterStyle};
  color: white;

  animation: change 3s infinite linear;
  animation-delay: ${({ idx }) => -(idx * 3) / 2}s;

  @keyframes change {
    0% {
      background: white;
    }
    10% {
      background: white;
    }
    11% {
      background: black;
    }
    20% {
      background: black;
    }
    21% {
      background: white;
    }
    22% {
      background: black;
    }
    31% {
      background: black;
    }
    61% {
      background: black;
    }
    62% {
      background: white;
    }
    100% {
      background: black;
    }
  }
`;
