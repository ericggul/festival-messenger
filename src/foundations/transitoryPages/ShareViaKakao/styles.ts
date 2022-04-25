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
  animation-delay: 5s;

  p {
    font-weight: 300;
    margin: 0.3rem 0;
    padding: 0;
    font-size: 1.1rem;
  }
`;

export const Text = styled.p`
  margin: 0.3rem 0;
  padding: 0;
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

export const Number = styled.div<Show>`
  font-family: Arial;
  position: absolute;
  background: #e84e3c;
  right: -1.2rem;
  top: -1.2rem;
  color: white;
  font-size: 3rem;
  font-weight: 300;
  padding: 0.5rem 1.2rem;
  border-radius: 3rem;

  ${({ show }) => show && "background: hsl(331, 91%, 62%)"};
  ${({ show }) => show && "filter: drop-shadow(0 0 2rem hsl(331, 94%, 62%))"};
  transition: all 4s;
`;
