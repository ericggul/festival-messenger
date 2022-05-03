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
  height: ${({ theme }) => theme.windowHeight}px;
  width: ${({ theme }) => theme.windowWidth}px;

  background: radial-gradient(blue, hotpink);
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
