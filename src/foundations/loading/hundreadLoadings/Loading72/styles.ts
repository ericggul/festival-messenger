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

export const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 10vw);
  grid-template-rows: repeat(5, 10vw);
`;

interface BoxProps {
  cycle: number;
}

export const Box = styled.div<BoxProps>`
  width: 10vw;
  height: 10vw;
  border-radius: 15%;
  background: white;
  animation-delay: -3.523s;

  animation: ${AppearAnimation} ${({ cycle }) => cycle}s alternate infinite ease-in;
`;
