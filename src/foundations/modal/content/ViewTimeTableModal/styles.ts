import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Background = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  ${CS.Box}

  color: white;
  width: ${({ theme }) => Math.min(theme.windowWidth, 768) * 0.9}px;
  background: linear-gradient(rgb(209, 38, 237), rgb(242, 57, 123));
`;

export const CloseButton = styled.div`
  ${CS.CloseButton}
  background: rgb(112, 53, 237);
`;

export const CloseIcon = styled.img`
  ${CS.CloseIcon}
`;

export const Contents = styled.div`
  ${FlexCenterStyle};
  height: 100%;
  flex-direction: column;
  transition: all 0.3s;
`;

export const Header = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  h1 {
    margin: 0.3rem 0;
    padding: 0;
    font-size: 1.2rem;
    color: white;
  }

  h2 {
    margin: 0.3rem 0;
    padding: 0;
    font-size: 2.5rem;
    color: white;
  }
`;

export const Carousel = styled.div`
  width: 100%;
  ${FlexCenterStyle};
`;

export const Arrow = styled.div`
  width: 10%;
  margin: 1rem;
  cursor: pointer;
  color: white;
  font-size: 3rem;
  transition: all 0.3s;
`;

export const ImageContainer = styled.div`
  width: 70%;
  height: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  transition: all 0.3s;
  z-index: ${({ theme }) => theme.zIndex.modalContent + 1};
`;

export const HiddenImg = styled.img`
  width: 100%;
  height: auto;
  opacity: 0;
  transition: all 0.3s;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  border-radius: 0.5rem;

  transform: perspective(100px);

  @keyframes imageChange {
    from {
      transform: rotateZ(180deg);
    }
    to {
      transform: rotateY(0);
    }
  }

  animation: imageChange 0.4s;
`;

export const Follow = styled.div`
  ${FlexCenterStyle};
  margin: 0;
  flex-direction: column;
  width: 100%;
`;

export const FollowText = styled.h2`
  font-size: 1rem;
  width: 70%;
  text-align: center;
  margin: 0.5rem 0;
  padding: 0;
`;

export const FollowInstagram = styled.div`
  width: 3rem;
  cursor: pointer;
  font-size: 3rem;
  text-decoration: none;
  margin: 0;
  padding: 0;
  margin-bottom: 2rem;

  border: 0px solid transparent;
`;
