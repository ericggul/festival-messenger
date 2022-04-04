import styled, { css } from "styled-components";

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

  background: ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`};
  opacity: 0.8;
  filter: blur(${({ theme }) => (theme.windowWidth * 2 + theme.windowHeight) * 0.03}px);
  -webkit-filter: blur(${({ theme }) => (theme.windowWidth * 2 + theme.windowHeight) * 0.03}px);

  animation: background 0.3s;
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
