import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};
  position: relative;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  text-align: center;
  flex-direction: column;
  background: linear-gradient(rgb(170, 250, 200), rgb(100, 0, 100), rgb(200, 250, 170));
`;

export const Rectangle = styled.div`
  width: 100%;
  height: 33.33%;
  ${FlexCenterStyle};

  background: rgba(255, 250, 255, 0.7);
`;

export const Circle = styled.div`
  font-family: Times New Roman;
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  background: rgb(70, 0, 70);
  ${FlexCenterStyle};
  text-align: center;
  color: white;
  font-size: 7vh;
  font-weight: 800;
`;
