import styled, { css } from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: absolute;
  top: 0;
  z-index: 0;
  left: 0;

  overflow: hidden;
`;

const ButtonCommon = css`
  cursor: pointer;

  position: absolute;
  font-weight: 300;
  z-index: 2;
  padding: 0 1.2rem;
  height: 2.2rem;
  font-size: 1rem;
  border-radius: 1.1rem;
  ${FlexCenterStyle};
  background: ${({ theme }) => theme.palette.TRANSPARENT_WHITE};
`;

interface ButtonProps {
  show: boolean;
}

export const AddMessageButton = styled.div<ButtonProps>`
  margin-left: 1rem;
  bottom: 110px;
  left: 0px;
  ${ButtonCommon};

  transition: opacity 0.8s;
  transition-delay: 0.5s;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const GhostButton = styled.div<ButtonProps>`
  right: 0;
  margin-right: 1rem;
  top: 10px;
  pointer-events: none;

  transition: opacity 0.8s;
  transition-delay: 0.8s;
  opacity: ${({ show }) => (show ? 1 : 0)};
  ${ButtonCommon};
`;

export const Button = styled.div<ButtonProps>`
  bottom: 110px;
  margin-right: 1rem;
  right: 0;
  ${ButtonCommon};

  transition: opacity 0.8s;
  transition-delay: 1.4s;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const ButtonLeft = styled.div<ButtonProps>`
  right: 0;
  margin-right: 1rem;
  top: 3.5rem;
  ${ButtonCommon};

  transition: opacity 0.8s;
  transition-delay: 1.1s;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const ButtonImg = styled.img`
  margin-right: 0.2rem;
  margin-left: -0.2rem;
`;
export const ButtonText = styled.div``;
