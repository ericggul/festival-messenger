import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Container = styled.div`
  ${WholeContainer};
  ${FlexCenterStyle};

  font-family: Noto Sans KR;
  transition: all 0.5s;
`;

export const Inner = styled.div`
  box-sizing: border-box;
  border: calc(min(5vw, 25px)) solid #f7e38d;
  width: 100%;
  height: ${({ theme }) => theme.windowHeight}px;

  ${FlexCenterStyle};
  flex-direction: column;
`;

export const Contents = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const NameContainer = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin-top: 5vh;
`;
export const PreName = styled.div`
  max-width: 65%;
  font-size: 1.7vh;
  text-align: center;
  ${FlexCenterStyle};
  margin-bottom: 1.3vh;
`;
export const Name = styled.div`
  font-size: 3vh;
  text-align: center;
  font-weight: bold;

  span {
    background: #f7e38d;
  }
`;
export const ImageContainer = styled.div`
  width: 32vh;
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }
`;
export const Description = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  max-width: 90%;
  text-align: center;
  font-size: 1.45vh;
  font-weight: lighter;

  min-height: 30vh;

  p {
    margin: 0.2vh 0;
  }
`;

export const MatchContainer = styled.div`
  ${FlexCenterStyle};
`;

export const Match = styled.div`
  width: calc(min(35vw, 30vh));
  height: 8vh;
  margin: 4vh calc(min(4vw, 5vh));
  background: #ffd55f;

  ${FlexCenterStyle};
  flex-direction: column;
`;
export const MatchUpper = styled.div`
  font-size: 1.45vh;
  text-align: center;
  ${FlexCenterStyle};
`;
export const MatchLower = styled.div`
  font-size: 1.8vh;
  font-weight: bold;
  text-align: center;
  ${FlexCenterStyle};
`;

////////
export const ChukasaContainer = styled.div`
  margin-top: 5vh;
  width: calc(min(45vw, 30vh));
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }
`;
export const ChukasaExpl = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 1vh 0;

  h1 {
    margin: -0.1vh 0;
    font-size: 2.5vh;
  }
  h2 {
    font-size: 2.2vh;
    margin: 0.3vh 0;
    margin-bottom: 1vh;
  }
`;
export const ShareContainer = styled.div`
  ${FlexCenterStyle};
  margin: 3vh 0;
  margin-top: 5vh;
`;
export const SingleShare = styled.div`
  width: calc(min(22vw, 15vh));
  margin: 0 calc(min(2.2vw, 1.5vh));
  height: 11vh;
  ${FlexCenterStyle};
  flex-direction: column;
  background: #ffefc7;
`;
export const Text = styled.div`
  font-size: 1.2vh;
  text-align: center;
`;
export const Image = styled.div`
  ${FlexCenterStyle};
  text-align: center;
  color: black;
  font-size: 5vh;
  margin-top: 1vh;
`;

export const ResultContainer = styled.div`
  width: calc(min(30vw, 40vh));
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }
`;
export const EventExpl = styled.div`
  ${FlexCenterStyle};
  margin-top: 2vh;
  max-width: 80%;
  text-align: center;
  flex-direction: column;
  margin-bottom: 10vh;

  h3 {
    font-size: 1.8vh;
    margin: 0;
  }
  h2 {
    font-size: 2.2vh;
    margin: 0;
  }
`;
