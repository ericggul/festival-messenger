import styled, { css } from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

const SKY_BLUE = `hsl(197, 100%, 43%)`;
const HOT_PINK = `hsl(331, 91%, 64%)`;

export const Container = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: 90vh;
  color: white;
  ${FlexCenterStyle};
  margin-bottom: 10vh;
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
  margin: 0.5rem 0;
`;

export const Text = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 300;
  margin: 0.4rem 0;
`;

export const Button = styled.div`
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: light;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  margin: 2rem 0;
  border: 1px dashed white;

  opacity: 0;
  animation: ${AppearAnimation} 1s forwards;
`;
