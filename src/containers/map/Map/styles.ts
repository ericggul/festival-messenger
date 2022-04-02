import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: absolute;
  top: 0;
  z-index: 0;
  left: 0;
`;

export const AddMessageButton = styled.div`
  cursor: pointer;

  position: absolute;
  font-weight: light;
  z-index: 2;
  top: 8.2rem;
  right: 0px;
  margin-right: 1rem;
  padding: 0 1rem;
  height: 2rem;
  font-size: 0.92rem;

  border-radius: 1rem;
  ${FlexCenterStyle};
  background: ${({ theme }) => theme.palette.TRANSPARENT_WHITE};
`;
