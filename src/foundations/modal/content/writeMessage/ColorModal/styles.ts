import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${FlexCenterStyle};
  height: 100px;
  margin-left: 1rem;

  animation: ${AppearAnimation} 0.3s;
`;

export const ColorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1.3rem);
  grid-template-rows: repeat(2, 1.3rem);
`;

interface ColorSelector {
  color: any;
}

export const Color = styled.div<ColorSelector>`
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 20%;
  background: ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`};
`;
