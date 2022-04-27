import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  ${FlexCenterStyle};
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5rem);
  -webkit-backdrop-filter: blur(5rem);
  box-shadow: inset 0 0 4rem rgba(0, 0, 0, 0.2);
`;

export const Text = styled.div`
  font-size: 1.2rem;
  margin: 0 2rem;
  text-align: center;
  animation: ${AppearAnimation} 1s backwards;
`;

export const ToMainButton = styled.div`
  margin: 2rem;
  width: 15rem;
  height: 3rem;
  font-size: 1.5rem;

  cursor: pointer;
  border: 1px solid black;
  border-radius: 1rem;
  ${FlexCenterStyle};
  animation: ${AppearAnimation} 1s backwards;
`;

export const AssistContainer = styled.div`
  ${FlexCenterStyle};
  flex-direction: row;
`;

export const AssistButton = styled.div`
  margin: 2rem;
  width: 10rem;
  height: 2.5rem;
  font-size: 1.2rem;

  cursor: pointer;
  border: 1px solid black;
  border-radius: 1rem;
  ${FlexCenterStyle};
  animation: ${AppearAnimation} 1s backwards;
`;
