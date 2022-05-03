import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

interface HeaderContainerProps {
  color: any;
  textColor: any;
}
export const HeaderContainer = styled.div<HeaderContainerProps>`
  touch-action: pan-x pan-y;
  width: ${({ theme }) => theme.windowWidth}px;
  height: 6.25rem;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  z-index: ${({ theme }) => theme.zIndex.headerColor};
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
  z-index: ${({ theme }) => theme.zIndex.headerText};
`;

export const Text = styled.div`
  font-size: 2.5rem;
  text-align: left;
`;

export const Logo = styled.div`
  font-size: 1.1rem;
  text-align: right;
  width: 6rem;
  cursor: pointer;
`;
