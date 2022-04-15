import styled, { css } from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const ContainerStyles = css`
  position: fixed;
  z-index: -5;
  top: 0;
  left: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  ${FlexCenterStyle};
  animation: ${AppearAnimation} 0.3s;
  overflow: hidden;
`;
