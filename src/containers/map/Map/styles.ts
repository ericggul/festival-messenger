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
  font-weight: light;
  z-index: 2;
  padding: 0 1.2rem;
  height: 2.2rem;
  font-size: 1rem;
  border-radius: 1.1rem;
  ${FlexCenterStyle};
  background: ${({ theme }) => theme.palette.TRANSPARENT_WHITE};
`;

export const AddMessageButton = styled.div`
  margin-right: 1rem;
  top: 7.5rem;
  right: 0px;
  ${ButtonCommon};
`;

export const Button = styled.div`
  right: 0;
  margin-right: 1rem;
  top: 10.2rem;
  ${ButtonCommon};
`;

export const ButtonLeft = styled.div`
  left: 0;
  margin-left: 1rem;
  top: 7.5rem;
  ${ButtonCommon};
`;

export const ButtonImg = styled.img`
  margin-right: 0.2rem;
  margin-left: -0.2rem;
`;
export const ButtonText = styled.div``;
