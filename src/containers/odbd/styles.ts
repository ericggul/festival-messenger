import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  background: black;
  transition: all 0.3s;
`;

export const Background = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  height: 100vh;
  transition: all 0.3s;

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const Contents = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  z-index: 1;

  transition: opacity 0.5s;
`;

export const Title = styled.div`
  position: absolute;
  top: 2rem;

  font-family: Happy;
  font-size: 4rem;
  line-height: 3rem;
  margin-top: 1rem;
  text-align: center;
`;

export const Footer = styled.div`
  font-family: Good;

  position: absolute;
  bottom: 2rem;
  font-size: 1.5rem;
  color: white;
`;

export const Img = styled.div`
  position: absolute;
  transition: all 0.3s;
  ${FlexCenterStyle};
  flex-direction: column;

  img {
    width: 100%;
  }

  //   animations

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes appear-from-left {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes appear-from-right {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes appear-from-top {
    0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes appear-from-bottom {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(20px);
    }
    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0);
    }
  }

  //animatuion jumping up-down like super mario koopa

  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-18px);
    }
    50% {
      transform: translateY(0);
    }
  }

  @keyframes grow {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    90% {
      transform: scale(2);
      opacity: 0.6;
    }
    92% {
      transform: scale(1) rotate(1080deg);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
