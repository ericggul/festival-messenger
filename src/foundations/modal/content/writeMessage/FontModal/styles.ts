import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${FlexCenterStyle};
  height: 100px;
  margin-left: 1rem;

  animation: ${AppearAnimation} 0.3s;
`;

export const FontContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 6rem);
  grid-template-rows: repeat(2, 2rem);
`;

interface FontInterface {
  font: any;
}

export const Font = styled.div<FontInterface>`
  ${FlexCenterStyle};
  width: 5.8rem;
  margin: 0 0.1rem;
  font-family: ${({ font }) => font};
  text-align: center;
  font-size: 0.8rem;
`;
