import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
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

  animation: ${AppearAnimation} 1s;
`;

export const Box = styled.div`
  width: 15rem;
  height: 20rem;
  background: transparent;
  margin: -7.5rem;
  position: relative;
`;

interface IdxProps {
  delay: any;
  duration: any;
  color: any;
  bottom: any;
}

export const InnerBox = styled.div<IdxProps>`
  position: absolute;
  ${({ bottom }) => (bottom ? "bottom: 0" : "top: 0")};
  width: 100%;
  height: 0;
  background: ${({ color }) => color};

  animation: move-height ${({ duration }) => duration}s infinite linear;
  animation-delay: ${({ delay }) => delay}s;
  @keyframes move-height {
    0% {
      height: 0;
    }

    10% {
      height: 20rem;
    }
    100% {
      height: 0;
    }
  }
`;

export const LoadingText = styled.div`
  font-family: Hollywood;
  font-size: 3rem;
  position: absolute;
  bottom: 7rem;
  text-align: center;

  color: white;
`;
