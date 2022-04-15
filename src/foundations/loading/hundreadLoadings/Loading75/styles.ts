import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};

  font-family: Times New Roman;
  position: relative;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  text-align: center;
  flex-direction: column;
  background: black;
`;

export const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 15vw);
  grid-template-rows: repeat(2, 15vw);
`;

interface BoxProps {
  rotate?: any;
  idx: any;
}

export const Box = styled.div<BoxProps>`
  width: 15vw;
  height: 15vw;

  color: #e90b0b;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 22.4vw;

  font-weight: bold;

  transform: rotate(${({ idx }) => idx === 1 && 45}deg);
  margin-top: ${({ idx }) => idx >= 2 && -0.55}vw;
  margin-left: ${({ idx }) => idx % 2 === 1 && -1.1}vw;
  font-size: ${({ idx }) => idx === 1 && 22.8}vw;
`;
