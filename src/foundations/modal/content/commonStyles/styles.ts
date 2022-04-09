import styled, { css } from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Background = css`
  pointer-events: none;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.2rem);
  -webkit-backdrop-filter: blur(0.2rem);
  animation: ${AppearAnimation} 0.3s;
  z-index: ${({ theme }) => theme.zIndex.modalBackground};
`;

export const Box = css`
  position: relative;

  display: flex;
  flex-direction: column;
  text-align: center;

  opacity: 0;
  animation: ${AppearAnimation} 1s forwards;
  animation-delay: 0.3s;
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.16);

  z-index: ${({ theme }) => theme.zIndex.modalContent};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4rem);
  -webkit-backdrop-filter: blur(4rem);
`;

export const CloseButton = css`
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  font-size: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #aaa;
  color: white;
  ${FlexCenterStyle};
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  z-index: ${({ theme }) => theme.zIndex.modalCancel};
`;

export const CloseIcon = css`
  width: 70%;
  height: 70%;
`;
