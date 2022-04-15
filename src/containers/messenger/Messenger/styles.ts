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

  left: 0;
  top: 0;
  min-width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;
  overflow-x: scroll;
`;

export const ChatSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-top: 30px;
`;
