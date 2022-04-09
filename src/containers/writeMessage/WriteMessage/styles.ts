import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  position: relative;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  display: flex;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
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
  z-index: ${({ theme }) => theme.zIndex.messageContent};
  color: ${({ isTextBlack }) => (isTextBlack ? "black" : "white")};

  transition: all 0.3s;
  font-family: ${({ font }) => font};
`;

export const CompletePanel = styled.div`
  font-family: Seoul Namsan;
  width: 10rem;
  min-height: 2.7rem;
  cursor: pointer;
  border-radius: 1.75rem;
  background: #f7fdea;
  font-size: 1.3rem;
  color: black;
  font-weight: bold;
  ${FlexCenterStyle};
  box-shadow: 0 0 4rem #fff;
  margin: 2rem;
`;
