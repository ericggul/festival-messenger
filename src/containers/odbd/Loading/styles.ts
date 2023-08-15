import styled from "styled-components";

export const Container = styled.div`
  touch-action: pan-x pan-y;
  position: fixed;
  top: 0;
  left: 0;

  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  cursor: wait;
  z-index: 1000;

  @keyframes disappear {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
`;
