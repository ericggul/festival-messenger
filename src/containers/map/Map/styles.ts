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

export const AddMessageButton = styled.div`
  margin-left: 1rem;
  bottom: 110px;
  left: 0px;
  ${ButtonCommon};
`;

export const GhostButton = styled.div`
  right: 0;
  margin-right: 1rem;
  top: 10px;
  pointer-events: none;
  ${ButtonCommon};
`;

export const Button = styled.div`
  bottom: 110px;
  margin-right: 1rem;
  right: 0;
  ${ButtonCommon};
`;

export const ButtonLeft = styled.div`
  right: 0;
  margin-right: 1rem;
  top: 3.5rem;
  ${ButtonCommon};
`;

export const ButtonImg = styled.img`
  margin-right: 0.2rem;
  margin-left: -0.2rem;
`;
export const ButtonText = styled.div``;
