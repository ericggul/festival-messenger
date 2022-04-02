import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

export const Background = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.2rem);
  -webkit-backdrop-filter: blur(0.2rem);
  animation: ${AppearAnimation} 0.3s;
  z-index: ${({ theme }) => theme.zIndex.modalBackground};
`;

export const Box = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  text-align: center;

  opacity: 0;
  animation: ${AppearAnimation} 1s forwards;
  animation-delay: 0.3s;
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.16);

  height: ${({ theme }) => theme.windowHeight * 0.7}px;
  width: ${({ theme }) => Math.min(theme.windowWidth, 800) * 0.9}px;
  z-index: ${({ theme }) => theme.zIndex.modalContent};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4rem);
  -webkit-backdrop-filter: blur(4rem);
`;

export const CloseButton = styled.div`
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  font-size: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #aaa;
  color: white;
  ${FlexCenterStyle};
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
`;

export const CloseIcon = styled.img`
  width: 70%;
  height: 70%;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const Upper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.75rem;
`;

export const Header = styled.div`
  ${FlexCenterStyle};
  text-align: center;
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 1.25rem;
`;

export const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.25rem;
`;

export const FriendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.25rem 0;
  margin-right: 0.75rem;
  width: 100%;
`;

export const Left = styled.div`
  display: flex;
`;
export const ProfileImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
`;

export const FriendText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 1.4rem;
  ${FlexCenterStyle};
  height: 3.5rem;
`;

export const Right = styled.div``;

export const SendIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
export const OtherFriendsList = styled.div`
  margin: 1.75rem;
  display: flex;
  flex-direction: column;
`;

export const ExplText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OtherFriendsListHeader = styled.div`
  display: flex;

  &:p {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    font-weight: light;
  }
`;

export const OtherFriendsListHeaderText = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;
