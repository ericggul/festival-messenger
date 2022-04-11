import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  cursor: wait;
`;
