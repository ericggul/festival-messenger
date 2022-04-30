import styled, { css } from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";
interface ImageProps {
  image: any;
  backgroundLoading?: any;
}

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  touch-action: pan-x pan-y;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  overflow: hidden;
  ${FlexCenterStyle};
  background-position: center;
  flex-direction: column;

  backdrop-filter: blur(2rem);
  -webkit-backdrop-filter: blur(2rem);
  background-size: cover;
`;

export const ExplText = styled.div`
  width: 100%;
  ${FlexCenterStyle};
  flex-direction: column;
  text-align: center;
  z-index: 3;
  h1 {
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 0.9rem;

    font-weight: 300;
  }
`;

export const BackgroundCommon = css`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  overflow: hidden;
  ${FlexCenterStyle};
  background-position: center;
  flex-direction: column;

  z-index: -4;
  background-size: cover;
  transition: all 0.4s;
  touch-action: pan-x pan-y;
`;

export const InitialBackgroud = styled.div`
  ${BackgroundCommon};
  background: linear-gradient(148.88deg, rgba(0, 158, 221, 0.8) 7%, rgba(247, 81, 160, 0.8) 115%);
  backdrop-filter: blur(2rem);
  -webkit-backdrop-filter: blur(2rem);
`;

export const BackgroundImage = styled.div<ImageProps>`
  ${BackgroundCommon};
  background-image: url(${(props) => props.image});
  opacity: ${({ backgroundLoading }) => (backgroundLoading ? 0 : 1)};
`;

export const InputBox = styled.input`
  mix-blend-mode: difference;
  outline: 0;
  text-align: center;

  border-radius: 0;
  border-bottom: 1px solid black;

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
  margin-top: 3rem;
  height: 2rem;
  width: 7rem;
  background: #f7fdea;
  box-shadow: 0 0 5rem #fff;
  ${FlexCenterStyle};
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: bold;
`;
