import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  touch-action: pan-x pan-y;
  position: absolute;

  top: 0;
  left: 0;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  ${FlexCenterStyle};

  flex-direction: column;
  overflow: hidden;
`;

export const Description = styled.div`
  ${FlexCenterStyle};

  text-align: center;
  flex-direction: column;
  margin: 2rem;
  h1 {
    margin: 0.3rem;
    padding: 0;
    font-size: 1.2rem;
  }

  h3 {
    margin: 0.2rem;
    padding: 0;
    font-size: 0.9rem;
    color: black;
  }

  z-index: 5;
`;

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
