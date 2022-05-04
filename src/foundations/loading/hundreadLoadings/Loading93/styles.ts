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
  width: 2rem;
  height: 7rem;
  background: blue;
  margin: 0.5rem;
  position: relative;
`;

interface IdxProps {
  idx: any;
}

export const InnerBox = styled.div<IdxProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background: yellow;

  animation: random-height 10s infinite linear;
  animation-delay: ${({ idx }) => -idx * 0.1}s;
  @keyframes random-height {
    0% {
      height: 4rem;
    }
    10% {
      height: 5rem;
    }
    13% {
      height: 1rem;
    }
    20% {
      height: 7rem;
    }
    31% {
      height: 2rem;
    }
    38% {
      height: 4rem;
    }
    45% {
      height: 3rem;
    }
    50% {
      height: 0rem;
    }
    60% {
      height: 7rem;
    }
    64% {
      height: 4rem;
    }
    70% {
      height: 2rem;
    }
    75% {
      height: 7rem;
    }
    80% {
      height: 5rem;
    }
    90% {
      height: 4rem;
    }
    95% {
      height: 3rem;
    }
  }
`;

export const LoadingText = styled.div`
  position: absolute;
  bottom: 7rem;
  text-align: center;
  font-family: Hollywood;
  font-size: 3rem;
  color: white;
`;
