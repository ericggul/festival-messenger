import styled, { css } from "styled-components";

interface ContainerType {
  color: any;
}

export const Container = styled.div<ContainerType>`
  height: ${({ theme }) => theme.windowHeight + 120}px;
  width: ${({ theme }) => theme.windowWidth + 120}px;
  position: fixed;
  top: -60px;
  left: -60px;

  z-index: -3;

  background: ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`};
  opacity: 0.8;
  filter: blur(60px);
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
