import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

interface HeaderContainerProps {
  color: any;
}
export const FooterContainer = styled.div<HeaderContainerProps>`
  width: ${({ theme }) => theme.windowWidth}px;
  height: 95px;
  position: fixed;
  top: ${({ theme }) => theme.windowHeight - 95}px;
  left: 0;
  background: ${({ color }) => color};
  zindex: ${({ theme }) => theme.headerColor};

  ${FlexCenterStyle};

  animation: appear 0.5s;
  animation-delay: 0.5;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const IconContainer = styled.div`
  top: 0;

  cursor: pointer;
  ${FlexCenterStyle};
  flex-direction: column;
  width: 84px;
  margin: ${({ theme }) => (theme.windowWidth < 768 ? "1.5rem" : ".8rem")} ${({ theme }) => (theme.windowWidth < 768 ? ".7rem" : "3rem")};
  margin-bottom: auto;
  zindex: ${({ theme }) => theme.headerText};
`;

interface IconProps {
  selected: boolean;
}

export const Icon = styled.img<IconProps>`
  width: ${({ selected }) => (selected ? "42px" : "36px")};
  transition: width 0.5s;
  height: auto;
`;

export const IconText = styled.div`
  margin-top: 0.5rem;
  font-weight: 300;
`;
