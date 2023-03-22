import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};

  font-family: Noto Sans KR;
  transition: all 0.5s;
`;

export const Inner = styled.div`
  box-sizing: border-box;
  border: calc(min(5vw, 25px)) solid #f7e38d;
  width: 100%;
  height: ${({ theme }) => theme.windowHeight}px;

  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Upper = styled.div`
  font-size: 1.75rem;
  font-weight: bold;

  margin-bottom: 2rem;
  span {
    background: #f7e38d;
  }
`;

export const Header = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin-top: 1rem;
`;

export const Top = styled.div`
  font-weight: bold;
  font-size: 2.7rem;
`;

export const ExplSector = styled.div`
  ${FlexCenterStyle};
  margin-right: 5.5rem;
`;
export const Expl = styled.div`
  font-size: 1.5rem;
  margin: 0 1.65rem;
  font-weight: lighter;
`;
export const ImageContainer = styled.div`
  width: calc(min(80vw, 38vh));
  height: calc(min(80vw, 38vh));
  ${FlexCenterStyle};
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  animation: intro-shake 1s ease-in-out infinite;

  @keyframes intro-shake {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    10% {
      transform: rotate(10deg);
    }
    20% {
      transform: rotate(-8deg);
    }
    30% {
      transform: rotate(6deg);
    }
    40% {
      transform: rotate(-4deg);
    }
    50% {
      transform: rotate(2deg);
    }
    60% {
      transform: rotate(-1deg);
    }
    70% {
      transform: rotate(0deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
`;
export const Text = styled.div`
  font-size: 1.5rem;
`;
export const Button = styled.div`
  font-size: 1.75rem;
  background: #f7e38d;
  padding: 0.4rem 2.5rem;
  margin-top: 1.5rem;
  cursor: pointer;

  box-shadow: 0 0 0.3rem #f7e38d, 0 0 0.5rem #f7e38d;
`;
