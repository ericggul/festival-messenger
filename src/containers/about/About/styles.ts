import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

const SKY_BLUE = `hsl(197, 100%, 43%)`;
const HOT_PINK = `hsl(331, 91%, 64%)`;

export const Background = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight * 2}px;

  background: linear-gradient(#7035ed -5%, #f2397b 100%);
  color: white;
`;
