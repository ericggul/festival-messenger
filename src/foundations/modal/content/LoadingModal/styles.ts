import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Container = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  height: 15vh;
  padding: 0 2rem;
  ${FlexCenterStyle};
  position: relative;

  display: flex;
  flex-direction: column;
  text-align: center;

  opacity: 1;
  animation: ${AppearAnimation} 1s forwards;
  animation-delay: 0.3s;
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.16);

  z-index: ${({ theme }) => theme.zIndex.modalContent};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4rem);
  -webkit-backdrop-filter: blur(4rem);

  flex-direction: column;

  p {
    margin: 0;
    padding: 0;
  }

  animation: silly-opqaque 3s infinite;

  @keyframes silly-opqaque {
    0% {
      transform: rotate(0deg);
    }
    40% {
      transform: rotate(0deg);
    }
    62% {
      transform: rotate(-15deg);
    }
    66% {
      transform: rotate(12deg);
    }
    69% {
      transform: rotate(-9deg);
    }
    71% {
      transform: rotate(7deg);
    }
    73% {
      transform: rotate(-5deg);
    }
    75% {
      transform: rotate(4deg);
    }
    77% {
      transform: rotate(-3deg);
    }
    78% {
      transform: rotate(2deg);
    }
    79% {
      transform: rotate(-1deg);
    }
    80% {
      transform: rotate(1deg);
    }
    81% {
      transform: rotate(-1deg);
    }
    82% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
`;
