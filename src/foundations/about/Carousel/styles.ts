import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface SizeProps {
  fullWidth: number;
  fullHeight: number;
  itemWidth: number;
}

export const StyledCarousel = styled.div<SizeProps>`
  position: relative;
  ${FlexCenterStyle};
  width: ${(props) => props.fullWidth}px;
  height: ${(props) => props.fullHeight}px;
  overflow-x: hidden;

  & div {
    position: absolute;
    width: ${(props) => props.itemWidth}px;
    height: ${(props) => props.itemWidth}px;
    ${FlexCenterStyle};

    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
  }
`;

export const ArrowButton = styled.div`
  font-size: 35px;
  color: white;
  cursor: pointer;
  user-select: none;
  margin: 0 2rem;
`;
