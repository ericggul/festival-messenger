import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

const brighter = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const Container = styled.div`
  font-family: Helvetica;
  ${ContainerStyles};
  position: relative;
  background: black;

  font-size: 20vh;
  color: white;

  flex-direction: row;
  font-weight: 800;
  text-transform: uppercase;

  overflow: hidden;
  ${FlexCenterStyle};
`;

interface LocProps {
  top: any;
  left: any;
  delay: any;
}

export const Box = styled.div<LocProps>`
  mix-blend-mode: difference;
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  margin-top: -4rem;
  margin-left: -4rem;
  width: 8rem;
  height: 8rem;
  background: pink;

  animation: move-rotate 3s infinite linear;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes move-rotate {
    0% {
      transform: rotate(0deg);
    }
    12.5% {
      transform: rotate(90deg);
    }
    25% {
      transform: rotate(90deg);
    }
    37.5% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(180deg);
    }
    62.5% {
      transform: rotate(270deg);
    }
    75% {
      transform: rotate(270deg);
    }
    87.5% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface DelayProps {
  delay: any;
}

export const InnerBox = styled.div<DelayProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6rem;
  background: white;

  animation: fill-in 1.5s infinite linear;
  animation-delay: ${({ delay }) => delay}s;
  @keyframes fill-in {
    0% {
      height: 0;
    }
    25% {
      height: 0;
    }
    50% {
      height: 8rem;
    }
    75% {
      height: 8rem;
    }
    100% {
      height: 0;
    }
  }
`;
