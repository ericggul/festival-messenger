import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  position: relative;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  display: flex;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  zindex: 10;
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

export const MainText = styled.div<IsTextBlack>`
  margin-top: 3rem;
  margin-bottom: 5rem;
  font-size: 1rem;
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;

  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};

  display: flex;
  flex-direction: column;
  line-break: normal;
  word-break: break-all;

  &::div {
    max-width: 100%;
  }
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
