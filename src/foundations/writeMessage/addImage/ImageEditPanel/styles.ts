import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

interface FontBlackType {
  colorBlack: any;
}
export const ImageEditContainer = styled.div<FontBlackType>`
  ${FlexCenterStyle};
  flex-direction: row;
  margin-top: 1.4rem;

  color: ${({ colorBlack }) => (colorBlack ? "black" : "white")};
  transition: all 0.3s ease-in-out;
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
