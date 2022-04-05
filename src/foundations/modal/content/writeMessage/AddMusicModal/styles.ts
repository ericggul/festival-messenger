import styled from "styled-components";
import { FlexCenterStyle, AppearAnimation } from "@S/style/responsive/display";
import * as CS from "@F/modal/content/commonStyles/styles";

export const Background = styled.div`
  ${CS.Background}
`;

export const Box = styled.div`
  ${CS.Box};
  height: 20rem;
  ${FlexCenterStyle};

  width: 25rem;
`;

export const CloseButton = styled.div`
  ${CS.CloseButton};
  background: ${({ theme }) => theme.palette.CANCEL_RED};
`;

export const CloseIcon = styled.img`
  ${CS.CloseIcon};
`;

//Container div
export const Container = styled.div`
  width: 100%;
  height: 100%;
  ${FlexCenterStyle};
  flex-direction: column;
`;

//Title p1
export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const MusicBox = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 5%;
  border: dashed 1px #777;
  ${FlexCenterStyle};
`;

export const MusicInput = styled.input.attrs({
  type: "file",
  accept: ".mp3,audio/*",
  id: "mp3-input",
})`
  cursor: pointer;
  outline: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  opacity: 0;
`;

export const GuideText = styled.div`
  ${FlexCenterStyle};
  color: #777 !important;
  font-size: 1.33rem;
  font-weight: 900;
`;
