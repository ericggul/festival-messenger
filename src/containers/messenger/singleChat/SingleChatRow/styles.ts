import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const SingleRow = styled.div`
  margin-left: 4rem;
  display: flex;
  align-items: center;
  flex-direction: row;

  height: 7rem;

  width: 100%;
  position: relative;
`;

interface Length {
  length: number;
}

export const RowLine = styled.div<Length>`
  position: absolute;
  margin: auto;
  padding: auto;
  left: 0;

  top: 0;
  bottom: 0;
  height: 1px;
  width: ${({ length }) => length}rem;
  background: ${({ theme }) => theme.palette.TIMELINE_GRAY};
`;

export const AddMessageButton = styled.div`
  cursor: pointer;
  position: absolute;
  margin: auto;

  left: 0;
  top: 0;
  bottom: 0;

  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;

  background: white;
  ${FlexCenterStyle};
  filter: drop-shadow(0 0.3rem 0.3rem rgba(0, 0, 0, 0.25));
`;

export const Icon = styled.img`
  width: 70%;
  height: 70%;
`;

interface LeftProps {
  left: number;
  read?: boolean;
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
  top: -1.03rem;
  margin: 0;
  padding: 0;
  font-size: 0.67rem;
  font-weight: 300;
  color: #666;
  margin-bottom: 0.33rem;
`;

export const Time = styled.p`
  position: absolute;
  bottom: -1.1rem;
  margin: 0;
  padding: 0;
  font-size: 0.67rem;
  font-weight: 300;
  color: #666;
  margin-top: 0.33rem;
`;

export const NameContainer = styled.div.attrs<LeftProps>((props) => ({
  style: {
    left: `${props.left - 1.6}rem`,
  },
}))<LeftProps>`
  position: absolute;
  top: -1.1rem;
  font-size: 0.67rem;
  font-weight: 300;
  color: #666;
  margin-bottom: 0.33rem;
`;
