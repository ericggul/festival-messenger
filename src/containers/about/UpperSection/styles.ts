import styled, { css } from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

const SKY_BLUE = `hsl(197, 100%, 43%)`;
const HOT_PINK = `hsl(331, 91%, 64%)`;

export const Container = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  ${FlexCenterStyle};
  flex-direction: column;
  font-family: Seoul Hangang;
`;

export const UpperPart = styled.div`
  ${FlexCenterStyle};
  font-family: Seoul Hangang;
  flex-direction: column;
`;

export const SingleClause = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const Header = styled.div`
  text-align: center;
  font-size: 3.33rem;
  font-weight: 300;
  margin: 0.6rem 0;
`;

export const Text = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 300;
  margin: 0.5rem 0;
`;

export const Button = styled.div`
  font-size: 1.25rem;
  font-weight: light;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  margin: 1rem 0;
  border: 1px dashed white;

  opacity: 0;
  animation: button-blink 1s infinite linear alternate;
  animation-delay: 7s;
  @keyframes button-blink {
    0% {
      opacity: 0.3;
    }
    10% {
      opacity: 0.3;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;