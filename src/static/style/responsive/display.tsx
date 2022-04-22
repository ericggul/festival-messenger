import { css, keyframes } from "styled-components";
import media from "styled-media-query";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export const FlexCenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
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
        opacity: 20%;
    }
    to{
        filter: blur(0);
        opacity: 100%;
    }
`;
