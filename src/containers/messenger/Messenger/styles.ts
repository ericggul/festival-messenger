import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  background: linear-gradient(180deg, #ebebeb 0%, rgba(203, 203, 203, 0) 100%, rgba(203, 203, 203, 0) 100%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 0;

  overflow: scroll;
  ${AppearAnimation};
`;

export const InnerContainer = styled.div`
  position: absolute;
  touch-action: pan-x pan-y;

  left: 0;
  top: 0;
  min-width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;
  overflow-x: scroll;
`;

export const Note = styled.p`
  margin: 0;
  padding: 0;
  margin-left: 3.45rem;
  margin-top: 8rem;
  margin-bottom: 4rem;
  font-size: 1rem;
  font-weight: light;
  color: #666;

  p {
    margin: 0;
    padding: 0;
  }
`;

export const FooterNote = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: light;
  color: #666;
  margin-bottom: 10rem;
  margin-left: 1.95rem;

  display: flex;
  align-items: center;
`;

interface SignifierProps {
  messageISent: boolean;
}

export const Signifier = styled.div<SignifierProps>`
  margin-left: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  background: ${({ messageISent }) => (!messageISent ? `hsl(241, 80%, 63%)` : `white`)};
  ${FlexCenterStyle};
  filter: drop-shadow(0 0.3rem 0.3rem rgba(0, 0, 0, 0.25));
`;

export const SignifierImg = styled.img`
  width: 80%;
  height: 80%;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
