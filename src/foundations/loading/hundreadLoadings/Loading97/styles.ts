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
  width: 3rem;
  height: 10rem;
  background: black;
  margin: 0.5rem;
  position: relative;

  border-radius: 1rem;
`;

interface IdxProps {
  delay: any;
  duration: any;
  color: any;
}

export const InnerBox = styled.div<IdxProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0;
  background: ${({ color }) => color};
  border-radius: 1rem;

  animation: move-height ${({ duration }) => duration}s infinite linear;
  animation-delay: ${({ delay }) => delay}s;
  @keyframes move-height {
    0% {
      height: 2rem;
    }

    10% {
      height: 10rem;
    }
    100% {
      height: 2rem;
    }
  }
`;

export const LoadingText = styled.div`
  position: absolute;
  bottom: 7rem;
  text-align: center;
  font-size: 2rem;
  color: white;
`;
