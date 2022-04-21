import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";

interface LengthProps {
  length: number;
}
export const TimeLine = styled.div<LengthProps>`
  margin-left: 4rem;
  margin-right: 4rem;
  height: 2px;
  width: ${({ length }) => length}rem;
  background: ${({ theme }) => theme.palette.TIMELINE_GRAY};
`;

interface DistanceProps {
  distance: number;
}

export const TimeSection = styled.div<DistanceProps>`
  display: flex;
  margin-left: calc(4rem - ${({ distance }) => distance / 2 - 0.4}rem);
  flex-direction: row;
`;

export const TimeContainer = styled.div<DistanceProps>`
  top: -0.4rem;
  position: relative;
  ${FlexCenterStyle};
  flex-direction: column;
  width: 1rem;
  margin: 0 ${({ distance }) => distance / 2 - 0.51}rem;
`;

export const TimeText = styled.div`
  top: -1.7rem;
  position: absolute;
  font-size: 0.9rem;
  width: 5rem;
  text-align: center;
`;

interface BubbleProps {
  oClock: boolean;
}

export const TimeBubble = styled.div.attrs<BubbleProps>((props) => ({
  style: {
    width: !props.oClock ? "0.6rem" : "0.8rem",
    height: !props.oClock ? "0.6rem" : "0.8rem",
    margin: !props.oClock ? "-0.2rem 0.1rem" : "0",
    marginTop: !props.oClock ? "-0.35rem" : "0",
  },
}))<BubbleProps>`
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.TIMEBUBBLE_GRAY};
`;

export const InnerTimeBubble = styled.div.attrs<BubbleProps>((props) => ({
  style: {
    background: !props.oClock ? `hsla(0, 0%, 73%, 1)` : `hsl(241, 80%, 63%)`,
  },
}))<BubbleProps>`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.TIMEBUBBLE_YELLOW};
`;
