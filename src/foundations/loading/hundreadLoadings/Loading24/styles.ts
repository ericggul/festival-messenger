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

  font-weight: 800;
  text-transform: uppercase;

  overflow: hidden;

  cursor: wait;
`;

interface SpinnerInterface {
  pos: any;
}

export const SpinnerTab = styled.div<SpinnerInterface>`
  position: absolute;
  height: 30rem;
  ${FlexCenterStyle};
  top: ${({ pos }) => pos.y}px;
  left: ${({ pos }) => pos.x}px;
`;

export const Credit = styled.div`
  text-transform: none;
  font-weight: light;

  position: absolute;
  top: 0;
  right: 1rem;
  font-size: 0.7rem;
  color: #444;
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

  background-size: 0.5rem 0.5rem;
  cursor: wait;
  background-repeat: repeat;
`;
