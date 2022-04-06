import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${FlexCenterStyle};
  height: 100px;
  margin-left: 1rem;

  animation: ${AppearAnimation} 0.3s;
  color: black;
`;

export const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 4.5rem);
  grid-template-rows: repeat(2, 2rem);
  font-size: 0.7rem;
`;

interface AudioProps {
  selected?: boolean;
}

export const AudioElement = styled.div<AudioProps>`
  ${FlexCenterStyle};
  text-align: center;
  border-radius: 10%;
  ${({ selected }) => selected && `box-shadow: 0 0 .3rem #aaa`};
`;

export const CustomAudio = styled.div<AudioProps>`
  ${FlexCenterStyle};
  ${({ selected }) => selected && `box-shadow: 0 0 .3rem #aaa`};

  &::div {
    ${FlexCenterStyle};
  }
`;
