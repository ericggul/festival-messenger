import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const SingleRow = styled.div`
  margin-left: 4rem;
  display: flex;
  align-items: center;
  flex-direction: row;

  height: 8rem;

  position: relative;
`;

interface LeftProps {
  left: number;
  read: boolean;
}

export const SingleMessage = styled.div.attrs<LeftProps>((props) => ({
  style: {
    left: `${props.read ? props.left - 1.0 : props.left - 1.6}rem`,
  },
}))<LeftProps>`
  ${FlexCenterStyle};
  flex-direction: column;
  position: absolute;
`;

export const Name = styled.p`
  position: absolute;
  top: -1.1rem;
  margin: 0;
  padding: 0;
  font-size: 0.67rem;
  font-weight: light;
  color: #666;
  margin-bottom: 0.33rem;
`;

export const Time = styled.p`
  position: absolute;
  bottom: -1.1rem;
  margin: 0;
  padding: 0;
  font-size: 0.67rem;
  font-weight: light;
  color: #666;
  margin-top: 0.33rem;
`;
