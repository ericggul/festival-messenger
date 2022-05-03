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
  background: white;

  font-size: 20vh;
  color: white;

  flex-direction: row;
  font-weight: 800;
  text-transform: uppercase;

  overflow: hidden;
  ${FlexCenterStyle};
`;

export const Wrapper = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: -8rem;
`;

interface IdxInterface {
  idx: number;
  color: any;
}

export const LoadingText = styled.div<IdxInterface>`
  font-size: 28vh;
  margin: -13vh 0;
  color: ${({ color }) => color};
  animation: ${brighter} 1s backwards;
  animation-delay: ${({ idx }) => idx * 0.7}s;
  text-shadow: 0 0 1rem ${({ color }) => color};
`;

interface ColorInterface {
  color: any;
}

export const Overlay = styled.div<ColorInterface>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(transparent 30%, ${({ color }) => color} 100%);

  background-size: 0.3rem 0.3rem;
  cursor: wait;
  background-repeat: repeat;
`;
