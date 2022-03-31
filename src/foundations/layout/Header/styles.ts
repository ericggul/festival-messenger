import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

interface HeaderContainerProps {
  color: any;
}
export const HeaderContainer = styled.div<HeaderContainerProps>`
  width: ${({ theme }) => theme.windowWidth}px;
  height: 96px;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ color }) => color};
  zindex: ${({ theme }) => theme.headerColor};
  ${FlexCenterStyle};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  margin: 1rem 2rem;
  margin-top: auto;
  width: 100%;
  justify-content: space-between;
  bottom: 0;
  zindex: ${({ theme }) => theme.headerText};
`;

export const Text = styled.div`
  font-size: 2.5rem;
  text-align: left;
`;

export const Logo = styled.div`
  font-size: 1.1rem;
  text-align: right;
  width: 7rem;
`;
