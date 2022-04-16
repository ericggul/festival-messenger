import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const SingleRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  height: 75px;

  position: relative;
`;

interface AbsolutePos {
  left: number;
}

export const SingleMessage = styled.div<AbsolutePos>`
  ${FlexCenterStyle};
  flex-direction: column;

  position: absolute;
  left: ${({ left }) => left}px;
`;

export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

export const Time = styled.p`
  margin: 0;
  padding: 0;
  font-size: 8px;
  font-weight: light;
  color: #666;
  margin-top: 4px;
`;
