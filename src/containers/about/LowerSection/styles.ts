import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;

  background: black;
  z-index: 1;

  ${FlexCenterStyle};
  color: white;
  flex-direction: column;
`;

export const Header = styled.div`
  margin-top: 4rem;
  font-size: 2rem;
`;

export const Main = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 3rem 1rem;
  margin-bottom: 5rem;
`;
export const Paragraph = styled.div`
  width: 90%;
  margin: 1rem;
`;

export const Last = styled.div`
  margin: 1rem;
`;

export const Button = styled.div`
  margin: 2rem 0;
  padding: 0.3rem 1.5rem;
  border: 1px dashed white;
  border-radius: 1rem;
`;
