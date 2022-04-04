import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const FatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  ${FlexCenterStyle};
  color: black;
  font-family: Seoul Namsan;
`;
interface ImgContainer {
  width: any;
  height: any;
}

export const ImageContainer = styled.div<ImgContainer>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  ${FlexCenterStyle};
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.01}px;
  animation: ${AppearAnimation} 0.5s;
`;
