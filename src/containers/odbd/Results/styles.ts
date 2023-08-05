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
  margin-top: ${({ theme }) => 0.035 * theme.windowHeight}px;
`;
export const PreName = styled.div`
  max-width: 75%;
  min-height: ${({ theme }) => 0.035 * theme.windowHeight}px;
  font-size: ${({ theme }) => 0.022 * theme.windowHeight}px;
  text-align: center;
  ${FlexCenterStyle};
  margin-bottom: ${({ theme }) => 0.01 * theme.windowHeight}px;
`;
export const Name = styled.div`
  font-size: ${({ theme }) => 0.035 * theme.windowHeight}px;
  text-align: center;
  font-weight: bold;

  span {
    background: #f7e38d;
  }
`;
export const ImageContainer = styled.div`
  width: ${({ theme }) => 0.32 * theme.windowHeight}px;
  margin: ${({ theme }) => -0.02 * theme.windowHeight}px 0;

  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }
`;
export const Description = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  max-width: 91%;
  text-align: center;
  font-size: ${({ theme }) => Math.min(0.0178 * theme.windowHeight, 0.033 * theme.windowWidth)}px;
  font-weight: lighter;

  min-height: ${({ theme }) => 0.35 * theme.windowHeight}px;

  p {
    margin: ${({ theme }) => 0.002 * theme.windowHeight}px 0;
  }
`;

export const MatchContainer = styled.div`
  ${FlexCenterStyle};
`;

export const Match = styled.div`
  width: calc(min(40vw, ${({ theme }) => 0.4 * theme.windowHeight}px));
  height: ${({ theme }) => 0.08 * theme.windowHeight}px;
  margin: ${({ theme }) => 0.025 * theme.windowHeight}px calc(min(2vw, ${({ theme }) => 0.02 * theme.windowHeight}px));
  background: #ffd55f;

  ${FlexCenterStyle};
  flex-direction: column;
  cursor: pointer;
`;

export const MatchUpper = styled.div`
  font-size: ${({ theme }) => Math.min(0.0185 * theme.windowHeight, 0.032 * theme.windowWidth)}px;
  text-align: center;
  ${FlexCenterStyle};
`;
export const MatchLower = styled.div`
  font-size: ${({ theme }) => 0.018 * theme.windowHeight}px;
  font-weight: bold;
  text-align: center;
  ${FlexCenterStyle};
`;

////////
export const ChukasaContainer = styled.div`
  margin-top: ${({ theme }) => 0.05 * theme.windowHeight}px;
  width: calc(min(45vw, ${({ theme }) => 0.3 * theme.windowHeight}px));
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }
`;
export const ChukasaExpl = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: ${({ theme }) => 0.01 * theme.windowHeight}px 0;
  max-width: 80%;
  text-align: center;

  h1 {
    margin: ${({ theme }) => -0.001 * theme.windowHeight}px 0;
    font-size: ${({ theme }) => 0.022 * theme.windowHeight}px;
  }
  h2 {
    font-size: ${({ theme }) => 0.02 * theme.windowHeight}px;
    margin: ${({ theme }) => 0.003 * theme.windowHeight}px 0;
    margin-bottom: ${({ theme }) => 0.01 * theme.windowHeight}px;
  }
`;
export const ShareContainer = styled.div`
  ${FlexCenterStyle};
  margin: ${({ theme }) => 0.03 * theme.windowHeight}px 0;
  margin-top: ${({ theme }) => 0.05 * theme.windowHeight}px;
`;
export const SingleShare = styled.div`
  width: calc(min(37vw, ${({ theme }) => 0.25 * theme.windowHeight}px));
  margin: 0 calc(min(2.2vw, ${({ theme }) => 0.015 * theme.windowHeight}px));
  height: ${({ theme }) => 0.11 * theme.windowHeight}px;
  ${FlexCenterStyle};
  flex-direction: column;
  background: #ffefc7;
  cursor: pointer;
`;
export const Text = styled.div`
  font-size: ${({ theme }) => 0.014 * theme.windowHeight}px;
  text-align: center;
`;
export const Image = styled.div`
  ${FlexCenterStyle};
  text-align: center;
  color: black;
  font-size: ${({ theme }) => 0.05 * theme.windowHeight}px;
  margin-top: ${({ theme }) => 0.01 * theme.windowHeight}px;
`;

export const ResultContainer = styled.div`
  width: calc(min(45vw, ${({ theme }) => 0.45 * theme.windowHeight}px));
  margin: ${({ theme }) => 0.05 * theme.windowHeight}px 0;
  ${FlexCenterStyle};

  img {
    max-width: 100%;
  }

  animation: jump-character 0.6s infinite;

  @keyframes jump-character {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15%) rotate(2deg);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
export const EventExpl = styled.div`
  ${FlexCenterStyle};
  margin-top: ${({ theme }) => 0.02 * theme.windowHeight}px;
  max-width: 80%;
  text-align: center;
  flex-direction: column;

  border: 1px solid black;
  padding: ${({ theme }) => 0.018 * theme.windowHeight}px ${({ theme }) => 0.01 * theme.windowHeight}px;

  h3 {
    font-size: ${({ theme }) => 0.018 * theme.windowHeight}px;
    margin: 0;
    font-weight: normal;
  }
  h2 {
    font-size: ${({ theme }) => 0.022 * theme.windowHeight}px;
    margin: 0;
  }
`;

export const Restart = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;

  font-size: 2rem;

  h2 {
    font-size: 1.7rem;
  }
  margin-top: ${({ theme }) => 0.05 * theme.windowHeight}px;
  margin-bottom: ${({ theme }) => 0.1 * theme.windowHeight}px;
`;
