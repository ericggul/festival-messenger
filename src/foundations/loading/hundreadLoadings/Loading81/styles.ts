import styled, { keyframes } from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  ${ContainerStyles};

  position: relative;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight * 5}px;

  text-align: center;
  background: linear-gradient(#2893ce, #927cab, #59b0c0, #2893ce);

  ${FlexCenterStyle};
  flex-direction: column;

  animation: moveY 6s linear infinite alternate;

  @keyframes moveY {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-${({ theme }) => theme.windowHeight * 4}px);
    }
  }
`;
export const Text = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: white;

  animation: ${AppearAnimation} 4s;
`;

export const LoadingContainer = styled.div`
  width: 5rem;
  height: auto;
`;
