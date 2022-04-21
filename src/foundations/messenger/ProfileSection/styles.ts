import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

interface ReadProps {
  read: boolean;
}
export const ProfileImgContainer = styled.div<ReadProps>`
  width: 4rem;
  height: 4rem;

  // opacity: ${({ read }) => (read ? 0.3 : 1)};
  drop-shadow: ${({ read }) => read && "0 0 0.5rem #000"};
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
  messageISent: boolean;
}

export const Signifier = styled.div<SignifierProps>`
  position: absolute;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  top: 1rem;
  right: -0.15rem;
  background: ${({ messageISent }) => (!messageISent ? `hsl(241, 80%, 63%)` : `white`)};
  ${FlexCenterStyle};
  filter: drop-shadow(0 0.3rem 0.3rem rgba(0, 0, 0, 0.25));
`;

export const SignifierImg = styled.img`
  width: 80%;
  height: 80%;
`;
