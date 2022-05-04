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
  background: linear-gradient(blue, green);

  font-size: 20vh;
  color: white;

  flex-direction: row;
  font-weight: 800;
  text-transform: uppercase;

  overflow: hidden;
  ${FlexCenterStyle};
`;

export const Box = styled.div`
  mix-blend-mode: difference;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 6rem;
  height: 6rem;
  background: pink;
  position: relative;

  animation: move-rotate 3s infinite linear;

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

export const InnerBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6rem;
  background: white;

  animation: fill-in 1.5s infinite linear;
  @keyframes fill-in {
    0% {
      bottom: 0;
      height: 0;
    }
    25% {
      bottom: 0;
      height: 0;
    }
    50% {
      height: 6rem;
    }
    75% {
      height: 6rem;
    }
    100% {
      height: 0;
    }
  }
`;
