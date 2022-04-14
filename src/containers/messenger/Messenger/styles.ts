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

  left: 0;
  top: 0;
  min-width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;
  overflow-x: scroll;
`;

export const TimeBar = styled.div``;

interface LengthProps {
  length: number;
}
export const TimeLine = styled.div<LengthProps>`
  margin-top: 13.33rem;
  margin-left: 6.5rem;
  margin-right: 6.5rem;
  height: 2px;
  width: ${({ length }) => length}px;
  background: ${({ theme }) => theme.palette.TIMELINE_GRAY};
`;

export const TimeSection = styled.div`
  ${FlexCenterStyle};
  flex-direction: row;
`;

export const TimeContainer = styled.div`
  top: -6px;
  position: relative;
  ${FlexCenterStyle};
  flex-direction: column;
  width: 10px;
  margin: 0 59px;
`;

export const TimeText = styled.div`
  top: -1.8rem;
  position: absolute;
  font-size: 0.9rem;
  width: 5rem;
  text-align: center;
`;
export const TimeBubble = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.TIMEBUBBLE_GRAY};
`;

export const InnerTimeBubble = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.TIMEBUBBLE_YELLOW};
`;

export const SingleRow = styled.div``;
