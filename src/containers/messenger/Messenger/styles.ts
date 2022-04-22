import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  background: linear-gradient(180deg, #ebebeb 0%, rgba(203, 203, 203, 0) 100%, rgba(203, 203, 203, 0) 100%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 0;

  overflow: scroll;
  ${AppearAnimation};
`;

export const InnerContainer = styled.div`
  position: absolute;
  touch-action: pan-x pan-y;

  left: 0;
  top: 0;
  min-width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;
  overflow-x: scroll;
`;

export const Note = styled.div`
  margin-left: 3.45rem;
  margin-top: 8rem;
  margin-bottom: 4rem;
  font-size: 1rem;
  font-weight: light;
  color: #666;

  p {
    margin: 0;
    padding: 0;
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
