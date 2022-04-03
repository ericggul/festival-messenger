import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

interface ContainerProps {
  showBorder: boolean;
}

export const FatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Container = styled.div<ContainerProps>`
  ${FlexCenterStyle};
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;
  height: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.5}px;
  position: relative;

  ${({ showBorder }) => showBorder && `border: dashed 1px #ddd;`}
  border-radius: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.01}px;

  animation: ${AppearAnimation} 0.3s;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.01}px;
  animation: ${AppearAnimation} 0.5s;
`;

//Image Editer

export const ImageEditContainer = styled.div`
  ${FlexCenterStyle};
  flex-direction: row;
  margin-left: auto;
  right: 0;
`;

export const Setting = styled.div`
  position: relative;
  cursor: pointer;
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 0 0.2rem;
  width: 3rem;
`;

export const Icon = styled.img`
  height: 2rem;
  width: auto;
`;

export const Text = styled.div`
  margin-top: 0.3rem;
  font-size: 0.7rem;
  font-weight: light;
`;
