import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const FatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  ${FlexCenterStyle};
  color: black;
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

//Image Editer

export const ImageEditContainer = styled.div`
  ${FlexCenterStyle};
  flex-direction: row;
  margin-top: 1.4rem;
`;

export const Setting = styled.div`
  position: relative;
  cursor: pointer;
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 0 0.2rem;
  width: 5rem;
`;

export const Icon = styled.img`
  height: 2rem;
  width: auto;
`;

interface TextType {
  bold?: boolean;
}

export const Text = styled.div<TextType>`
  margin-top: 0.3rem;
  font-size: 0.7rem;
  font-weight: light;
  ${({ bold }) => bold && "font-weight: bold;"}
  text-align: center;
`;
