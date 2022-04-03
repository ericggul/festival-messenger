import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${FlexCenterStyle};
  width: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.8}px;
  height: ${({ theme }) => Math.min(theme.windowWidth, theme.windowHeight) * 0.5}px;
  position: relative;

  border: dashed 1px #ddd;
  border-radius: 2%;

  animation: ${AppearAnimation} 0.6s;
`;

export const ImageInputLabel = styled.label.attrs({
  htmlFor: "image-input",
})``;

export const ImageInput = styled.input.attrs({
  type: "file",
  accept: "image/*",
  id: "image-input",
})`
  cursor: pointer;
  outline: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  opacity: 0;
`;

export const GuideText = styled.div`
  ${FlexCenterStyle};
  color: #ddd;
  font-size: 1.33rem;
  font-weight: 800;
`;

export const DeleteBox = styled.div`
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.CANCEL_RED};
  ${FlexCenterStyle};
`;

export const DeleteRect = styled.div`
  width: 0.75rem;
  height: 0.333rem;
  background: white;
  cursor: pointer;
`;
