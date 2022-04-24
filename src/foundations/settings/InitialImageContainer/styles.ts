import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";
export const Container = styled.div`
  width: 100%;
  height: 19rem;
  ${FlexCenterStyle};
`;

export const ImageContainer = styled.div`
  margin: 0.75rem;
  width: 12rem;
  height: 12rem;
  position: relative;
  font-size: 10rem;
  ${FlexCenterStyle};
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  box-shadow: 0.1rem 0.1rem 1rem rgba(255, 255, 255, 0.7);

  p {
    margin-top: 11.5rem;
  }
`;

export const ChangeContainer = styled.div`
  position: absolute;
  width: 3rem;
  height: 3rem;
  top: 9.1rem;
  left: 9.1rem;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  ${FlexCenterStyle};
`;

export const Change = styled.img`
  width: 60%;
  height: 60%;
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.15);
`;
