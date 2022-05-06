import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const ImageContainer = styled.div`
  width: 19rem;
  height: 19rem;
  position: relative;
`;

export const ChangeContainer = styled.div`
  position: absolute;
  width: 3rem;
  height: 3rem;
  top: 15.1rem;
  left: 15.1rem;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0.1rem 0.1rem 1rem rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor: pointer;
  ${FlexCenterStyle};
`;

export const Change = styled.img`
  width: 60%;
  height: 60%;
`;

interface ImgFace {
  imgLoaded: boolean;
}

export const Image = styled.img<ImgFace>`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.15);

  opacity: ${({ imgLoaded }) => (imgLoaded ? 1 : 0)};
  transtion: opacity 0.5s;
`;
