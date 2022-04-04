import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";
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
  font-weight: 300;
  ${({ bold }) => bold && "font-weight: bold;"}
  text-align: center;
`;
