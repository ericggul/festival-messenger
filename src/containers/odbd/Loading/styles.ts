import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};

  font-family: Noto Sans KR;
  transition: all 0.5s;
`;

export const Inner = styled.div`
  box-sizing: border-box;
  border: calc(min(5vw, 25px)) solid #f7e38d;
  width: 100%;
  height: ${({ theme }) => theme.windowHeight}px;

  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Contents = styled.div`
  width: 100%;
  height: 83%;
  ${FlexCenterStyle};
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderContainer = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Header = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export const Upper = styled.div`
  font-size: 25px;
  font-weight: bold;

  margin-bottom: 20px;
  span {
    background: #f7e38d;
  }
`;

export const ImageContainer = styled.div`
  width: calc(min(80vw, 40vh));
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }

  @keyframes cute-shake {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    10% {
      transform: translate(-5px, -5px) rotate(-5deg);
    }
    20% {
      transform: translate(5px, 5px) rotate(5deg);
    }
    30% {
      transform: translate(-5px, 5px) rotate(5deg);
    }
    40% {
      transform: translate(5px, -5px) rotate(-5deg);
    }
    50% {
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }

  animation: cute-shake 1s ease-in-out infinite;
`;

export const ChukasaContainer = styled.div`
  width: calc(min(40vw, 18vh));
  margin: 1rem 0;
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }
`;
