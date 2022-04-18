import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  display: flex;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  zindex: 10;
  cursor: default;
`;

interface FontInterface {
  font: any;
  isTextBlack: boolean;
}

export const MessagePanel = styled.div<FontInterface>`
  width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;

  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  z-index: 15;
  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};

  transition: all 0.3s;
  font-family: ${({ font }) => font};
`;

interface IsTextBlack {
  isTextBlack?: boolean;
}

export const ToText = styled.div<IsTextBlack>`
  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};
  margin-top: 6rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;
`;

interface SpanIdx {
  idx: number;
}

export const Span = styled.span<SpanIdx>`
  padding: 0;
  margin: 0;

  animation: flip-text 7s infinite linear;
  animation-delay: ${({ idx }) => idx * 0.15}s;

  @keyframes flip-text {
    0% {
      transform: rotateY(0deg);
      opacity: 0;
    }
    20% {
      transform: rotateY(360deg);
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const MainText = styled.div<IsTextBlack>`
  cursor: default;
  margin-top: 3rem;
  margin-bottom: 10rem;
  font-size: 1rem;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;

  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};

  line-break: normal;
  word-break: break-all;
`;

interface ImgContainer {
  width: any;
  height: any;
}

export const ImageContainer = styled.div<ImgContainer>`
  margin: 1rem 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  ${FlexCenterStyle};
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.01}px;
  animation: ${AppearAnimation} 0.5s;
`;
