import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const RotateText = styled.div`
  ${FlexCenterStyle};
  pointer-events: none;
  color: #ddd !important;
  font-size: 1.33rem;
  font-weight: 900;
`;

interface SpanIdx {
  idx: number;
}

export const Span = styled.span<SpanIdx>`
  padding: 0;
  margin: 0;

  animation: flip-text 9s infinite linear;
  animation-delay: ${({ idx }) => idx * 0.1}s;

  @keyframes flip-text {
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
