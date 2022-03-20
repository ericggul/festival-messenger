import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/responsive/display";

export const SignInBox = styled.div`
  ${FlexCenterStyle};

  flex-direction: column;
  text-align: center;

  animation: ${AppearAnimation} 1s;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.16);

  width: ${({ theme }) => theme.windowWidth * 0.5}px;
`;

export const CloseButton = styled.div``;

export const Text = styled.div``;
