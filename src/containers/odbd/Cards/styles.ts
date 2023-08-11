import styled, { keyframes } from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Background = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};
  height: 100vh;
  transition: all 0.35s;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const Header = styled.div`
  top: 2rem;
  width: ${({ theme }) => (theme.windowWidth < 768 ? "15rem" : "10rem")};
  margin-top: ${({ theme }) => (theme.windowWidth < 768 ? "5rem" : "3rem")};

  ${FlexCenterStyle}

  img {
    width: 100%;
  }
`;

export const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  row-gap: ${({ theme }) => (theme.windowWidth < 768 ? "18px" : "9px")};
  column-gap: ${({ theme }) => (theme.windowWidth < 768 ? "15px" : "7px")};
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.75, theme.windowHeight * 0.8 * 0.5)}px;
`;

export const SingleCard = styled.div`
  ${FlexCenterStyle}
  transition: transform 0.4s ease-in-out, blur 0.1s ease-in-out;
`;

export const cardAnimation = (idx: any) => keyframes`
from {
  transform: translateX(${100 * (-(idx % 4) + 1.5)}%) translateY(${100 * (4.5 - Math.floor(idx / 4))}%) rotate(${((idx % 4) - 1.5) * 30}deg);
  opacity: 0;
}
to {
  transform: translateX(0) translateY(0%) rotate(0deg);
  opacity: 1;
}

`;

interface Img {
  idx: number;
}

export const Img = styled.img<any>`
  width: 100%;
  cursor: pointer;
  animation: ${({ idx }: any) => cardAnimation(idx)} 0.4s both;
  animation-delay: ${({ idx }: any) => idx * 0.09 + 0.5}s;
`;

export const Footer = styled.div`
  font-family: Good;

  margin-bottom: 25px;
  margin-top: 15px;
  font-size: 1.5rem;
  color: white;
`;
