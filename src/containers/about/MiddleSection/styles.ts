import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  top: ${({ theme }) => theme.windowHeight}px;
  left: 0;
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  ${FlexCenterStyle};
`;
