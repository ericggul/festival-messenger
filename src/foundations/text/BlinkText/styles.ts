import styled, { keyframes } from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  width: 100%;
  height: 4rem;
  background: ${({ theme }) => theme.palette.YELLOW};
  ${FlexCenterStyle};
`;

const BlurredAppearAnimation = keyframes`
    0%{
        filter: blur(1rem);
        opacity: 0;
        font-size: 0rem;
    }
    70%{
        filter: blur(0px);
        opacity: 1;
    }
    100%{
        filter: blur(0px);
        opacity: 1;
        font-size: 1.5rem;
    }
`;

export const Span = styled.span`
  margin: 0;
  padding: 0;

  animation: ${BlurredAppearAnimation} 1s infinite alternate backwards;
  animation-delay: 2s;
`;
