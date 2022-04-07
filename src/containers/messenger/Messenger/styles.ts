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
  width: 10000px;
  min-width: ${({ theme }) => theme.windowWidth}px;
  min-height: ${({ theme }) => theme.windowHeight}px;

  overflow: scroll;
`;

export const TimeBar = styled.div``;

interface LengthProps {
  length: number;
}
export const TimeLine = styled.div<LengthProps>`
  margin-top: 13.33rem;
  margin-right: 6.5rem;
  height: 2px;
  width: ${({ length }) => length}px;
  background: ${({ theme }) => theme.palette.TIMELINE_GRAY};
`;

export const TimeContainer = styled.div`
  ${FlexCenterStyle};
`;

export const TimeText = styled.div``;
export const TimeBubble = styled.div``;

export const SingleRow = styled.div``;
