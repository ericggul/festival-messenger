import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

interface Show {
  show: boolean;
}

export const Container = styled.div<Show>`
  cursor: pointer;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  margin: 0;
  padding: 0;
  background: #f5e14c;

  ${({ show }) => show && "background: hsla(197, 100%, 43%, 0.5)"};
  ${FlexCenterStyle}
  flex-direction: column;

  transition: background 4s;

  animation: ${AppearAnimation} 1s backwards;
  animation-delay: 0.5s;
`;

export const SubContainer = styled.div`
  margin-top: 5rem;

  ${FlexCenterStyle};
  flex-direction: column;

  animation: ${AppearAnimation} 1s backwards;

  p {
    margin: 0.3rem 0;
    padding: 0;
    font-size: 1.1rem;
  }
`;

export const Back = styled.div`
  animation: ${AppearAnimation} 1s backwards;
  position: absolute;
  right: 0;
  margin-right: 2rem;
  ${FlexCenterStyle};
  flex-direction: column;
  cursor: pointer;
  top: 0;
  margin-top: 2rem;
`;

export const Icon = styled.img`
  height: 2rem;
  width: auto;
`;

export const Text = styled.div`
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-weight: 300;
`;

export const ImgContainer = styled.div`
  width: 15rem;
  height: 15rem;
  position: relative;

  animation: ${AppearAnimation} 0.4s;
`;

export const Img = styled.img<Show>`
  width: 100%;
  height: 100%;
  ${({ show }) => show && "filter: drop-shadow(0 0 2rem hsl(48, 94%, 62%))"};
  transition: all 4s;
`;
