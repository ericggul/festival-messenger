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

interface SquareProps {
  idx: number;
}

export const Square = styled.div<SquareProps>`
  background: white;
  border-radius: 50%;

  width: 1.5vw;
  height: 1.5vw;
  margin: 0.15vw;

  animation: move 3s infinite backwards;
  animation-delay: ${({ idx }) => (Math.abs(idx - 25) * 1.2) / 51}s;

  ${FlexCenterStyle};

  @keyframes move {
    0% {
      border-radius: 0;
      opacity: 0;
    }
    15% {
      opacity: 1;
    }

    100% {
      border-radius: 50%;
      opacity: 0;
    }
  }
`;
