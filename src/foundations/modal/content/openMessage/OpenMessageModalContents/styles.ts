import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

interface ContainerColor {
  color: any;
}

export const Container = styled.div`
  animation: ${AppearAnimation} 0.3s;
  border-radius: 0.75rem;
  width: 100%;
  height: 100%;

  position: relative;
  opacity: 1;
  color: white;

`;

export const Background = styled.div<ContainerColor>`
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

  opacity: 1;
`;

export const HeaderText = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.67rem;
`;

export const Time = styled.div`
  position: relative;
  ${FlexCenterStyle};
`;
export const TimeIcon = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  margin-right: 5rem;
`;
export const TimeText = styled.p`
  margin: 0;
  padding: 0;
`;

export const Profile = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const ContentsPreview = styled.div`
  ${FlexCenterStyle};
`;
export const FromText = styled.div``;
export const BodyText = styled.div``;

export const ButtonContainer = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.div``;

export const NotAccessible = styled.div``;

// <S.Header>

// <S.HeaderText>메시지 열어보기</S.HeaderText>
// <S.Time>
//   <S.TimeIcon />
//   <S.TimeText>3시간전</S.TimeText>
// </S.Time>
// </S.Header>
// <S.Profile />
// <S.ContentsPreview>
// <S.FromText>From. 홍길동</S.FromText>
// <S.BodyText>이 편지를 쓰느라 얼마나 고민했는지...</S.BodyText>
// </S.ContentsPreview>

// <S.ButtonContainer>
// <S.Button>열기</S.Button>
// {!messageAvailable && <S.NotAccessible>핀이 찍힌 위치 가까이로 가주세요.</S.NotAccessible>}

// </S.ButtonContainer>
