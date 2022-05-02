import styled from "styled-components";

export const Background = styled.div`
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  position: absolute;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight * 2}px;

  color: white;
  background: black;
`;
