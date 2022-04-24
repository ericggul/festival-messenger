import styled, { css } from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import { Background } from "@F/modal/content/commonStyles/styles";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: absolute;
  top: 0;
  z-index: 0;
  left: 0;

  overflow: hidden;
`;

export const ButtonCommon = css`
  cursor: pointer;

  position: absolute;
  font-weight: 300;
  z-index: 5;
  padding: 0 1.2rem;
  height: 2.2rem;
  font-size: 1rem;
  border-radius: 1.1rem;
  ${FlexCenterStyle};

  opacity: 1 !important;
  background: #ffffff !important;
`;

interface ButtonProps {
  show: boolean;
  focusAddMessageButton?: boolean;
}

export const AddMessageButton = styled.div<ButtonProps>`
  margin-left: 1rem;
  bottom: 110px;
  left: 0px;
  ${ButtonCommon};

  transition: opacity 0.8s;
  transition-delay: 0.5s;
  opacity: ${({ show }) => (show ? 1 : 0)};
  box-shadow: ${({ focusAddMessageButton }) => focusAddMessageButton && "0 0 2rem white"};
  z-index: 15;
`;

export const AddMessageButtonFocus = styled.div<ButtonProps>`
  ${Background};
  opacity: ${({ show }) => (show ? 1 : 0)};
  z-index: 10;
  transition: opacity 0.3s;

  font-size: 1.3rem;
  font-weight: bold;
  mix-blend-mode: darken;
  ${FlexCenterStyle};
  flex-direction: column;
`;

interface SpanIdx {
  idx: number;
}

export const FocusText = styled.span`
  padding: 0.3rem 0.5rem;
  animation: ${AppearAnimation} 3s backwards;
  animation-delay: 4.5s;
`;

export const Span = styled.span<SpanIdx>`
  padding: 0;
  margin: 0;

  animation: flip-text-rotate 9s infinite linear;
  animation-delay: ${({ idx }) => idx * 0.05}s;

  @keyframes flip-text-rotate {
    0% {
      transform: rotateY(0deg);
      opacity: 1;
    }
    12.5% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    37.5% {
      opacity: 0;
    }
    50% {
      transform: rotateY(360deg);
      opacity: 1;
    }

    100% {
      transform: rotateY(360deg);
    }
  }
`;

export const GhostButton = styled.div<ButtonProps>`
  right: 0;
  margin-right: 1rem;
  top: 10px;

  transition: opacity 0.8s;
  transition-delay: 0.5s;
  opacity: ${({ show }) => (show ? 1 : 0)};
  ${ButtonCommon};
`;

export const Button = styled.div<ButtonProps>`
  bottom: 110px;
  margin-right: 1rem;
  right: 0;
  ${ButtonCommon};

  transition: opacity 0.8s;
  transition-delay: 0.5s;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const ButtonLeft = styled.div<ButtonProps>`
  right: 0;
  margin-right: 1rem;
  top: 3.5rem;
  ${ButtonCommon};

  transition: opacity 0.8s;
  transition-delay: 0.5s;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const ButtonImg = styled.img`
  margin-right: 0.2rem;
  margin-left: -0.2rem;
`;
export const ButtonText = styled.div``;
