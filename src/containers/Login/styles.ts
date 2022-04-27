import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  touch-action: pan-x pan-y;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  ${FlexCenterStyle};
  overflow: hidden;
`;

export const Description = styled.div``;

export const Button = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  width: 18rem;
  height: 3.5rem;

  background: ${({ theme }) => theme.palette.YELLOW};

  box-shadow: 0 0.3rem 0.5rem #cfb9467;
  cursor: pointer;

  ${FlexCenterStyle};
  text-align: center;

  z-index: 5;
`;
