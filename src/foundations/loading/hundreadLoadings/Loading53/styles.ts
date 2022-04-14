import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};
  position: relative;

  background: linear-gradient(white, black);
  backgroud-repeat: repeat;
  background-size: 100vw 2.5vw;

  font-size: 25vw;
  font-family: Times New Roman;
  font-weight: 800;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  overflow: hidden;
  text-align: center;
  ${FlexCenterStyle};
  flex-direction: column;

  h1 {
    margin: 10vh;
    font-size: 20vw;
    font-weight: 800;
    mix-blend-mode: difference;
    color: white;
  }

  p {
    margin: 0;
    font-size: 5vw;
    mix-blend-mode: difference;
    color: white;
  }
`;
