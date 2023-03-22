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

export const Upper = styled.div`
  font-size: 1.75rem;
  font-weight: bold;

  margin-bottom: 2rem;
  span {
    background: #f7e38d;
  }
`;

export const Header = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin-top: 1.3rem;
`;

export const Top = styled.div`
  font-weight: bold;
  font-size: 2.7rem;
`;

export const ExplSector = styled.div`
  ${FlexCenterStyle};
  margin-right: 5.5rem;
`;
export const Expl = styled.div`
  font-size: 1.5rem;
  margin: 0.3rem 1.65rem;
  font-weight: lighter;
`;
export const ImageContainer = styled.div`
  width: calc(min(70vw, 30vh));
  margin: 1rem 0;
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }
`;
export const Text = styled.div`
  font-size: 2rem;
`;
export const Button = styled.div`
  font-size: 1.75rem;
  background: #f7e38d;
  padding: 0.4rem 2.5rem;
  margin-top: 1.5rem;
  cursor: pointer;
`;
