import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${FlexCenterStyle};
  height: 100px;
  margin-left: 1rem;

  animation: ${AppearAnimation} 0.3s;
  color: black;
`;

export const FontContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3.7rem);
  grid-template-rows: repeat(3, 2rem);
`;

interface FontInterface {
  font: any;
  selected: boolean;
}

export const Font = styled.div<FontInterface>`
  border-radius: 10%;
  ${({ selected }) => selected && `box-shadow: 0 0 .3rem #aaa`};

  ${FlexCenterStyle};
  width: 3.5rem;

  font-family: ${({ font }) => font};
  text-align: center;
  font-size: 0.9rem;
  color: black;
`;
