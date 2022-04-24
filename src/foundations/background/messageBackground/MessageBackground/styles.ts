import styled, { css } from "styled-components";
import { AppearAnimation } from "@S/style/responsive/display";

interface ContainerType {
  color: any;
}

export const Container = styled.div<ContainerType>`
  height: ${({ theme }) => theme.windowHeight * 1.1}px;
  width: ${({ theme }) => theme.windowWidth * 1.1}px;
  position: fixed;

  top: -${({ theme }) => theme.windowHeight * 0.05}px;
  left: -${({ theme }) => theme.windowWidth * 0.05}px;

  z-index: -3;

  background: linear-gradient(${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`}, ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l - 20}%)`});
  opacity: 0.6;

  animation: background 1s;
`;

export const Button = styled.div`
  width: 100vw;
  position: absolute;
  top: 10vh;
  left: 0;
  text-align: center;
  color: black;
  font-size: 2rem;
  cursor: pointer;
`;
