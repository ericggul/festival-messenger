import styled, { css } from "styled-components";

interface ContainerType {
  color: any;
}

export const HiddenContainer = styled.div<ContainerType>`
  position: fixed;
  height: ${({ theme }) => theme.windowHeight}px;
  width: ${({ theme }) => theme.windowWidth}px;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.7;
  z-index: -10;

  animation: changeBackground 10s infinite alternate;

  @keyframes changeBackground {
    from {
      background: white;
    }
    to {
      background: black;
    }
  }
`;

export const Container = styled.div<ContainerType>`
  height: ${({ theme }) => theme.windowHeight * 1.1}px;
  width: ${({ theme }) => theme.windowWidth * 1.1}px;
  position: fixed;

  top: -${({ theme }) => theme.windowHeight * 0.05}px;
  left: -${({ theme }) => theme.windowWidth * 0.05}px;

  z-index: -3;

  background: linear-gradient(${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`}, ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l - 20}%)`});
  opacity: 0.6;
  // filter: blur(${({ theme }) => (theme.windowWidth * 2 + theme.windowHeight) * 0.025}px);
  // -webkit-filter: blur(${({ theme }) => (theme.windowWidth * 2 + theme.windowHeight) * 0.025}px);

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
