import styled from "styled-components";

interface Props {
  displayMap: any;
}

export const MapContainer = styled.div<Props>`
  height: ${({ theme }) => theme.windowHeight}px;
  ${(props) => (props.displayMap ? "opacity: .8" : "opacity : 0")};
  zindex: 0;
`;
