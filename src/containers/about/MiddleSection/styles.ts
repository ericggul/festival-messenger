import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  top: ${({ theme }) => theme.windowHeight}px;
  left: 0;
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  overflow: hidden;
  ${FlexCenterStyle};

  background: linear-gradient(#daf9fd, white);
`;

const widthConverter = (value: any, theme: any) => value * (Math.min(theme.windowWidth, 500) / 375);

export const TextContainer = styled.div`
  position: absolute;
  width: ${({ theme }) => Math.min(theme.windowWidth, 500)}px;
  top: ${({ theme }) => theme.windowHeight / 2 - Math.min(theme.windowWidth, 500) * 0.6}px;

  animation: change-color 1s ease-in forwards;
  animation-delay: 2.7s;
  @keyframes change-color {
    from {
      color: black;
    }
    to {
      color: #fe3f3f;
    }
  }
`;

export const Designed = styled.div`
  position: absolute;
  ${FlexCenterStyle};

  top: ${({ theme }) => widthConverter(0, theme)}px;
  left: ${({ theme }) => widthConverter(-19, theme)}px;
  width: ${({ theme }) => widthConverter(323, theme)}px;
  height: ${({ theme }) => widthConverter(112, theme)}px;
  font-size: ${({ theme }) => widthConverter(64, theme)}px;
  line-height: ${({ theme }) => widthConverter(64, theme)}px;

  font-weight: bold;
  transform: rotate(-9.33deg);

  animation: designed-rotate 0.5s infinite alternate;

  @keyframes designed-rotate {
    from {
      transform: rotate(-12deg);
    }
    to {
      transform: rotate(-6.5deg);
    }
  }
`;

export const And = styled.div`
  position: absolute;
  ${FlexCenterStyle};

  top: ${({ theme }) => widthConverter(82, theme)}px;
  left: ${({ theme }) => widthConverter(91, theme)}px;
  width: ${({ theme }) => widthConverter(198.56, theme)}px;
  height: ${({ theme }) => widthConverter(112, theme)}px;
  font-size: ${({ theme }) => widthConverter(135, theme)}px;
  line-height: ${({ theme }) => widthConverter(135, theme)}px;

  font-weight: 900;

  animation: scaling 1s ease-in-out infinite alternate backwards;
  animation-delay: 1s;
  @keyframes scaling {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1.05);
    }
  }
`;

export const Developed = styled.div`
  position: absolute;
  ${FlexCenterStyle};

  top: ${({ theme }) => widthConverter(158, theme)}px;
  left: ${({ theme }) => widthConverter(72, theme)}px;
  width: ${({ theme }) => widthConverter(323, theme)}px;
  height: ${({ theme }) => widthConverter(112, theme)}px;
  font-size: ${({ theme }) => widthConverter(60, theme)}px;
  line-height: ${({ theme }) => widthConverter(60, theme)}px;

  transform: rotate(6.82deg);
`;

export const By = styled.div`
  position: absolute;
  ${FlexCenterStyle};

  top: ${({ theme }) => widthConverter(236, theme)}px;
  left: ${({ theme }) => widthConverter(5, theme)}px;
  width: ${({ theme }) => widthConverter(83, theme)}px;
  height: ${({ theme }) => widthConverter(35.5, theme)}px;
  font-size: ${({ theme }) => widthConverter(30, theme)}px;
  line-height: ${({ theme }) => widthConverter(30, theme)}px;

  transform: rotate(3.27deg);

  animation: ${AppearAnimation} 0.5s linear infinite alternate backwards;
  animation-delay: 1.9s;
`;

export const JYC = styled.div`
  position: absolute;
  ${FlexCenterStyle};

  top: ${({ theme }) => widthConverter(293, theme)}px;
  left: 0;
  width: 100%;
  height: ${({ theme }) => widthConverter(56, theme)}px;
  font-size: ${({ theme }) => widthConverter(150, theme)}px;
  line-height: ${({ theme }) => widthConverter(150, theme)}px;

  font-weight: 900;
`;

export const With = styled.div`
  position: absolute;
  ${FlexCenterStyle};

  top: ${({ theme }) => widthConverter(363, theme)}px;
  left: 0;
  width: 100%;
  height: ${({ theme }) => widthConverter(56, theme)}px;
  font-size: ${({ theme }) => widthConverter(50, theme)}px;
  line-height: ${({ theme }) => widthConverter(50, theme)}px;

  font-weight: 300;

  opacity: 0;
  animation: ${AppearAnimation} 1s forwards;
  animation-delay: 2.5s;
`;
