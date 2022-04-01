import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

interface HeaderContainerProps {
  color: any;
}
export const HeaderContainer = styled.div<HeaderContainerProps>`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => (theme.windowWidth < 768 ? 75 : 100)}px;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ color }) => color};
  zindex: ${({ theme }) => theme.headerColor};
  ${FlexCenterStyle};

  opacity: 0;
  animation-delay: 0.5s;
  animation: appearAndDisappear 10s forwards;
  @keyframes appearAndDisappear {
    0% {
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
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
