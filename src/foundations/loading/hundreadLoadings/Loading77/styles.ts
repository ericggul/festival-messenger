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
  background: black;
`;

interface ContainerProps {
  size: any;
  idx: any;
}
export const InnerContainer = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(2, ${({ size }) => size}vw);
  grid-template-rows: repeat(2, ${({ size }) => size}vw);

  animation: ${AppearAnimation} 0.5s linear alternate infinite;
  animation-delay: ${({ idx }) => -1 + idx / 5}s;
`;

interface BoxProps {
  rotate?: any;
  idx: any;
  size: any;
}

export const Box = styled.div<BoxProps>`
  width: 100%;
  height: 100%;

  color: #e90b0b;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: ${({ size }) => size * 1.493}vw;

  font-weight: bold;

  transform: rotate(${({ idx }) => idx === 1 && 45}deg);
  margin-top: ${({ idx, size }) => idx >= 2 && -size * 0.0366}vw;
  margin-left: ${({ idx, size }) => idx % 2 === 1 && -size * 0.07333}vw;
  font-size: ${({ idx, size }) => idx === 1 && size * 1.52}vw;
`;
