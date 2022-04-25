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

  background: linear-gradient(147.6deg, ${SKY_BLUE} 9%, ${HOT_PINK} 100%);
  ${FlexCenterStyle};
`;
