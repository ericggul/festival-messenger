import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;
  margin-left: 1.95rem;
  font-size: 1rem;
  font-weight: light;
  color: #666;
`;

export const FooterNote = styled.div`
  display: flex;
  align-items: center;

  opacity: 0;
  animation-delay: 1s;
  animation: ${AppearAnimation} 0.5s forwards;
`;

interface SignifierProps {
  messageISent: boolean;
}

export const Signifier = styled.div<SignifierProps>`
  margin-left: 1.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  background: ${({ messageISent }) => (!messageISent ? `hsl(241, 80%, 63%)` : `white`)};
  ${FlexCenterStyle};
  filter: drop-shadow(0 0.3rem 0.3rem rgba(0, 0, 0, 0.25));
  animation-delay: 1s;
  animation: ${AppearAnimation} 0.5s forwards;
`;

export const SignifierImg = styled.img`
  width: 80%;
  height: 80%;
`;

export const SendButton = styled.div`
  cursor: pointer;
  width: 20rem;

  font-size: 1rem;
  display: flex;
  align-items: center;
`;
