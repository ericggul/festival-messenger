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
}

export const SingleMessage = styled.div.attrs<LeftProps>((props) => ({
  style: {
    left: `${props.left - 1.6}rem`,
  },
}))<LeftProps>`
  ${FlexCenterStyle};
  flex-direction: column;
  position: absolute;
`;

export const Name = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.67rem;
  font-weight: light;
  color: #666;
  margin-bottom: 0.33rem;
`;

export const Time = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.67rem;
  font-weight: light;
  color: #666;
  margin-top: 0.33rem;
`;
