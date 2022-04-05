import styled, { css } from "styled-components";

interface ContainerType {
  color: any;
}

const getColor = (hsl: any) => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

export const Container = styled.div<ContainerType>`
  height: ${({ theme }) => theme.windowHeight * 1.1}px;
  width: ${({ theme }) => theme.windowWidth * 1.1}px;
  position: fixed;

  top: -${({ theme }) => theme.windowHeight * 0.05}px;
  left: -${({ theme }) => theme.windowWidth * 0.05}px;

  z-index: -3;

  background: radial-gradient(at 83% 25%, ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`} 0, transparent 21%),
    radial-gradient(at 36% 47%, ${({ color }) => `hsl(${color.h - 10}, ${color.s + 31}%, ${color.l}%)`} 0, transparent 50%),
    radial-gradient(at 79% 45%, ${({ color }) => `hsl(${350 - color.h}, ${color.s}%, ${color.l}%)`} 0, transparent 28%),
    radial-gradient(at 66% 8%, ${({ color }) => `hsl(${color.h - 50}, ${color.s + 30}%, ${color.l}%)`} 0, transparent 53%),
    radial-gradient(at 89% 13%, ${({ color }) => `hsl(${color.h}, ${color.s - 20}%, ${color.l}%)`} 0, transparent 54%),
    radial-gradient(at 24% 97%, ${({ color }) => `hsl(${color.h}, ${color.s + 15}%, ${color.l + 30}%)`} 0, transparent 40%),
    radial-gradient(at 76% 46%, ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l + 30}%)`} 0, transparent 50%),
    radial-gradient(at 76% 76%, ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l + 30}%)`} 0, transparent 50%);

  background: ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`};
  background: linear-gradient(${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`}, ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l - 20}%)`});
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
