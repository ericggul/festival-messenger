import styled from "styled-components";
import { ContainerStyles } from "@F/loading/common/styles";

export const Container = styled.div`
  ${ContainerStyles};
  position: relative;
  background: black;

  font-size: 10vh;
  color: white;

  flex-direction: column;
  font-weight: 800;
  text-transform: uppercase;

  span {
    margin: -0.3rem 0;
    padding: 0;

    animation: brighter 0.5s backwards;

    &:nth-child(1) {
      color: #fe5047;
      animation-delay: 1s;
    }
    &:nth-child(2) {
      color: #fe5047;
      animation-delay: 1s;
    }
    &:nth-child(3) {
      color: #ffe04e;
      animation-delay: 1.5s;
    }
    &:nth-child(4) {
      color: #ffe04e;
      animation-delay: 1.5s;
    }
    &:nth-child(5) {
      color: #2ea57d;
      animation-delay: 2s;
    }
    &:nth-child(6) {
      color: #2ea57d;
      animation-delay: 2s;
    }
    &:nth-child(7) {
      color: #2ea57d;
      animation-delay: 2s;
    }

    @keyframes brighter {
      from {
        opacity: 0.1;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(transparent, black);

  background-size: 0.2rem 0.2rem;
`;
