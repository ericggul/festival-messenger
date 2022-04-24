import styled from "styled-components";

interface Props {
  displayMap: any;
}

export const MapContainer = styled.div<Props>`
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
  ${(props) => (props.displayMap ? "opacity: 1" : "opacity : 0")};
  transition: opacity 0.8s;
  z-index: 0;

  canvas {
    opacity: 0.9;
  }
`;

export const Marker = styled.div`
  max-width: 3.25rem;
  max-height: 3.25rem;
  object-fit: cover;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
`;
