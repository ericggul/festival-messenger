import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

const SKY_BLUE = `hsl(197, 100%, 43%)`;
const HOT_PINK = `hsl(331, 91%, 64%)`;

export const Container = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  ${FlexCenterStyle};
`;

export const Contents = styled.div`
  width: 100%;
  height: 100%;
  z-index: 5;

  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Intro = styled.div`
  text-align: center;
`;

export const Expl = styled.div`
  text-align: center;

  p {
    font-size: 0.8rem;
    font-color: #ccc;
  }
`;
