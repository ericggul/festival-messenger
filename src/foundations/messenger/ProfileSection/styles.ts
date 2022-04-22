import styled, { css } from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

interface ReadProps {
  read: boolean;
}
export const ProfileImgContainer = styled.div<ReadProps>`
  width: ${({ read }) => (read ? 2.8 : 4)}rem;
  height: ${({ read }) => (read ? 2.8 : 4)}rem;

  opacity: ${({ read }) => (read ? 0.8 : 1)};
  filter: ${({ read }) => read && `grayscale(50%)`};
  // drop-shadow: ${({ read }) => read && "0 0 0.5rem #000"};

  animation: ${AppearAnimation} 1s backwards;
`;

export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
`;

interface SignifierProps {
  read: boolean;
  messageISent: boolean;
}

export const Signifier = styled.div<SignifierProps>`
  position: absolute;
  border-radius: 50%;
  width: ${({ read }) => (read ? "0.9" : "1.2")}rem;
  height: ${({ read }) => (read ? "0.9" : "1.2")}rem;
  top: 1rem;
  right: -0.1rem;
  background: ${({ messageISent }) => (!messageISent ? `hsl(241, 80%, 63%)` : `white`)};
  ${FlexCenterStyle};
  filter: drop-shadow(0 0.3rem 0.3rem rgba(0, 0, 0, 0.25));
`;

export const SignifierImg = styled.img`
  width: 80%;
  height: 80%;
`;
