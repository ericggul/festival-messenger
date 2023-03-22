import { css, keyframes } from "styled-components";

export const FlexCenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WholeContainer = css`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  touch-action: pan-x pan-y;
  overflow: hidden;
`;

export const AppearAnimation = keyframes`
    from{ 
        opacity: 0;
    }
    to{
        opacity: 100%;
    }
`;

export const BlurredAppearAnimation = keyframes`
    from{ 
        filter: blur(3rem);
        opacity: 80%;
    }
    to{
        filter: blur(0) grayscale(0%);
        opacity: 100%;
    }
`;
