import styled from "styled-components";
import { FlexCenterStyle } from "@S/style/responsive/display";

export const Container = styled.div`
  width: ${({ theme }) => theme.windowWidth}px;

  z-index: 1;

  ${FlexCenterStyle};
  color: white;
  flex-direction: column;
  background: linear-gradient(148.88deg, rgba(0, 158, 221, 0.8) 7%, rgba(247, 81, 160, 0.8) 115%);
`;

export const Header = styled.div`
  margin-top: 4rem;
  font-size: 1.5rem;
`;

export const Main = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 2rem 1rem;
  margin-bottom: 10rem;
`;
export const Paragraph = styled.div`
  width: 90%;
`;

export const Last = styled.div`
  margin: 1rem;
`;

export const Poster = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    pointer-events: none;
    user-select: none;
    border-radius: 10px;
  }
`;

export const Texts = styled.div`
  ${FlexCenterStyle};
  flex-direction: column;
  margin: 1.2rem 0;
  color: white;

  p {
    margin: 0;
    line-height: 1.3;

    &:nth-of-type(1) {
      font-size: 1.5rem;
    }

    &:nth-of-type(2) {
      font-size: 2.2rem;
      margin-bottom: 0.7rem;
    }
  }

  div {
    width: 30rem;
    font-size: 0.8rem;

    line-height: 1.63;
    word-break: keep-all;
    text-align: center;

    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export const Line = styled.hr`
  width: 9rem;
`;

export const ButtonGuide = styled.div`
  margin: 0.5rem;
  text-align: center;
`;
export const Buttons = styled.div`
  ${FlexCenterStyle};
`;

export const Button = styled.div`
  text-align: center;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: light;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  border: 3px double rgba(255, 255, 255, 0.5);

  p {
    &:nth-of-type(1) {
      font-size: 0.8rem;
      padding: 0;
      margin: 0.5rem;
    }

    &:nth-of-type(2) {
      font-size: 1.2rem;
      padding: 0;
      margin: 0.5rem;
    }
  }
`;

// export const CanvasWrapper = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
// `;
