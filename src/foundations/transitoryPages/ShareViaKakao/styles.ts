import styled from "styled-components";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;

  margin: 0;
  padding: 0;
`;

interface IconPos {
  top: number;
  left: number;
}
export const Icon = styled.img<IconPos>`
  position: absolute;
  top: ${({ top }) => top - 25}px;
  left: ${({ left }) => left - 25}px;
  width: 50px;
  height: 50px;
`;
