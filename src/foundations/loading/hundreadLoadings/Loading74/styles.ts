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
  position: relative;
  display: grid;
  width: 15vw;
  height: 15vw;
  grid-template-columns: repeat(5, 3vw);
  grid-template-rows: repeat(5, 3vw);
  color: white;
`;

interface BoxProps {
  cycle: number;
  color: any;
}

export const Box = styled.div<BoxProps>`
  mix-blend-mode: difference;
  width: 3vw;
  height: 3vw;

  background: ${({ color }) => color};

  animation-delay: -3.523s;

  animation: ${AppearAnimation} ${({ cycle }) => cycle}s alternate infinite ease-in;
`;
