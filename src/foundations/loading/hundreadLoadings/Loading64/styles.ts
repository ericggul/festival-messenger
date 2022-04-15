import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};

  font-family: Courier New;
  position: relative;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  text-align: center;
  flex-direction: column;
  background: black;
`;

interface BoxInterface {
  top: number;
  left: number;
}

export const Box = styled.div<BoxInterface>`
  position: absolute;
  ${FlexCenterStyle};
  width: 10vw;
  height: 10vw;
  color: white;

  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;
