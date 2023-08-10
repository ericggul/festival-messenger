import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

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
  row-gap: ${({ theme }) => (theme.windowWidth < 768 ? "18px" : "10px")};
  column-gap: ${({ theme }) => (theme.windowWidth < 768 ? "15px" : "8px")};
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.75, theme.windowHeight * 0.8 * 0.5)}px;
`;

export const SingleCard = styled.div`
  ${FlexCenterStyle}
  img {
    width: 100%;
    cursor: pointer;
  }
`;

export const Footer = styled.div`
  font-family: Good;

  margin-bottom: 25px;
  margin-top: 15px;
  font-size: 1.5rem;
  color: white;
`;
