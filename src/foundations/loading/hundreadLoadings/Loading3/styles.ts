import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

const brighter = keyframes`
from {
  opacity: 0.1;
}
to {
  opacity: 1;
}
`;

export const Container = styled.div`
  ${ContainerStyles};
  position: relative;
  background: #222;

  font-size: 20vh;
  color: white;

  flex-direction: row;
  font-weight: 800;
  text-transform: uppercase;

  overflow: hidden;
  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Row = styled.div`
  ${FlexCenterStyle};

  flex-direction: column;
  div {
    margin: 2vh;
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    animation: ${brighter} 1s backwards;

    &:nth-child(1) {
      background-color: #fe5047;
      box-shadow: 0 0 3rem #fe5047;
    }
    &:nth-child(2) {
      background-color: #ffe04e;
      box-shadow: 0 0 3rem #ffe04e;
      animation-delay: 1s;
    }
    &:nth-child(3) {
      background-color: #2ea57d;
      box-shadow: 0 0 3rem #2ea57d;
      animation-delay: 2s;
    }
  }
`;

export const LoadingText = styled.div`
  font-size: 10vh;
  margin-top: 3vh;
  color: white;
  animation: ${brighter} 1s backwards;
  animation-delay: 3s;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(transparent, black);

  background-size: 0.5rem 0.5rem;
`;
