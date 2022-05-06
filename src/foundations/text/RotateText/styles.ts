import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

interface FontColorType {
  colorBlack: any;
}

export const RotateText = styled.div<FontColorType>`
  ${FlexCenterStyle};
  pointer-events: none;
  color: #ddd;
  font-size: 1.33rem;
  font-weight: 900;

  ${({ colorBlack }) => colorBlack && "color: black;"}
`;

interface SpanIdx {
  idx: number;
}

export const Span = styled.span<SpanIdx>`
  padding: 0;
  margin: 0;

  animation: flip-text-rotate 9s infinite linear;
  animation-delay: ${({ idx }) => idx * 0.1}s;

  @keyframes flip-text-rotate {
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(360deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`;
