import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const FatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
  margin-top: 1rem;
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
