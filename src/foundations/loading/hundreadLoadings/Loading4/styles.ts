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
`;

export const Wrapper = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 1rem;
`;

interface IdxInterface {
  idx: number;
}

export const LoadingText = styled.div<IdxInterface>`
  font-size: 10vh;
  color: white;
  animation: ${brighter} 1s backwards;
  animation-delay: ${({ idx }) => idx * 0.7}s;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(transparent 0%, pink 100%);

  background-size: 0.2rem 0.2rem;
  cursor: wait;
`;
