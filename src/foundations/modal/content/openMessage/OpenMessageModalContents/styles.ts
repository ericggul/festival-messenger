import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

interface ContainerColor {
  color: any;
}

export const Container = styled.div<ContainerColor>`
  ${FlexCenterStyle};
  flex-direction: column;
  animation: ${AppearAnimation} 0.7s;
  border-radius: 0.75rem;
  width: 100%;
  height: 100%;

  position: relative;
  opacity: 1;
  color: ${({ color }) => (color.black ? "black" : "white")};
  z-index: 99;
`;

export const Background = styled.div<ContainerColor>`
  border-radius: 0.75rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ color }) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`};

  opacity: 0.6;
`;

export const Header = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 1rem 0;
  opacity: 1;
`;

export const HeaderText = styled.h1`
  padding: 0;
  margin: 0.5rem 0;
  font-size: 1.8rem;
  font-weight: bold;
`;

export const Time = styled.div`
  position: relative;
  margin-bottom: 0.8rem;
  ${FlexCenterStyle};
`;
export const TimeIcon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;
export const TimeText = styled.p`
  margin: 0 1rem;
  padding: 0;
`;

export const Profile = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
  opacity: 1;
`;

export const ContentsPreview = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const BodyText = styled.div`
  font-size: 1rem;
`;

export const ButtonContainer = styled.div`
  height: 5.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

interface ButtonProps {
  shine: boolean;
}

export const Button = styled.div<ButtonProps>`
  ${FlexCenterStyle};
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ shine }) => (shine ? "black" : "#696969")};
  width: 10rem;
  height: 2.5rem;
  border-radius: 1.5rem;
  background: ${({ shine }) => (shine ? "#f7fdea" : "#b1afaf")};
  box-shadow: ${({ shine }) => shine && "0 0 5rem #fff"};
  cursor: ${({ shine }) => shine && "pointer"};
`;

export const NotAccessible = styled.div<ContainerColor>`
  color: ${({ color }) => (color.black ? "#555" : "#dfdfdf")};

  font-size: 0.8rem;
  p {
    margin: 0;
    padding: 0;
  }
`;

export const AlmostAccessible = styled.div`
  font-size: 0.8rem;
  p {
    margin: 0;
    padding: 0;
  }
`;
