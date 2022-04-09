import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";
export const Container = styled.div`
  height: ${({ theme }) => theme.windowHeight}px;
  ${FlexCenterStyle};
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5rem);
  -webkit-backdrop-filter: blur(5rem);
  box-shadow: inset 0 0 4rem rgba(0, 0, 0, 0.2);
`;

export const Text = styled.div`
  font-size: 1.5rem;
  text-align: center;
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
`;
