import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const SingleRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  height: 6.3rem;

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

export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  cursor: pointer;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
`;

export const Time = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.67rem;
  font-weight: light;
  color: #666;
  margin-top: 0.33rem;
`;
