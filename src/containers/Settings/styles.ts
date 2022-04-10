import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  overflow: hidden;
  ${FlexCenterStyle};

  flex-direction: column;

  backdrop-filter: blur(4rem);
  -webkit-backdrop-filter: blur(4rem);
`;

export const BackgroundImage = styled.img`
  position: absolute;
  left: 0;
  right: 0;

  top: -5px;
  bottom: -5px;
  margin: auto;
  min-width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;

  filter: brightness(2);
  z-index: -1;
`;

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

export const Image = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.15);
`;

export const InputBox = styled.input`
  outline: 0;
  text-align: center;

  font-size: 1.67rem;
  font-weight: bold;

  margin-top: 2rem;
  border: none;
  background-color: transparent;

  &::placeholder {
    color: ${(props) => props.theme.palette.HANDWRITING_INPUT};
  }
`;

export const SaveButton = styled.div`
  cursor: pointer;
  margin-top: 5rem;
  height: 3.5rem;
  width: 11rem;
  background: #f7fdea;
  box-shadow: 0 0 5rem #fff;
  ${FlexCenterStyle};
  border-radius: 1.75rem;
  font-size: 1.67rem;
  font-weight: bold;
`;
