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
  width: 76%;
  height: 73%;
  ${FlexCenterStyle};
  justify-content: space-between;
  flex-direction: column;
`;

export const Rios = styled.div`
  ${FlexCenterStyle};
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const Rio = styled.div`
  width: calc(min(5vw, 25px));
  box-sizing: border-box;
  margin: 0 calc(min(0.5vw, 2.5px));
  height: calc(min(5vw, 25px));
  border-radius: 50%;

  transition: all 0.5s;

  ${FlexCenterStyle};

  img {
    width: 130%;
    height: 130%;

    @keyframes appear {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    animation: appear 0.5s ease-in-out;
  }
`;

export const QuestionSector = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 35px;
  width: 100%;
`;
export const QuestionIdx = styled.div`
  font-weight: bold;
`;
export const Question = styled.div`
  text-align: left;
  margin-top: 2rem;
  font-size: 25px;
`;
export const AnswerSector = styled.div`
  ${FlexCenterStyle};
  width: 100%;
  flex-direction: column;
  font-size: 20px;
  font-weight: lighter;
`;
export const Answer = styled.div`
  width: 100%;
  ${FlexCenterStyle};
  background: #f7e38d;

  border-radius: 0.5rem;
  margin: 1rem 0;

  div {
    padding: 1rem 2rem;
  }

  @keyframes rotate-appear {
    0% {
      transform: rotateY(-90deg);
      opacity: 0;
    }
    100% {
      transform: rotateY(0deg);
      opacity: 1;
    }
  }

  animation: rotate-appear 1s ease-in-out;
  transition: all 0.5s ease-in-out;
`;
