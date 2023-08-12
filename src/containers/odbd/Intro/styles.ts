import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Text = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.4);

  animation: appear 0.5s both;
  animation-delay: 0.4s;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const InnerText = styled.div`
  padding: 1rem;
  font-family: Goolim;
  margin-top: ${({ theme }: any) => (theme.windowWidth < 768 ? "18vw" : "4.5rem")};
  font-size: ${({ theme }: any) => (theme.windowWidth < 768 ? theme.windowHeight * 0.025 + "px" : "1rem")};
  line-height: ${({ theme }: any) => (theme.windowWidth < 768 ? theme.windowHeight * 0.035 + "px" : "1.5rem")};
  transition: all 0.5s ease-in-out;

  animation: appear 0.5s both;
  animation-delay: 0.5s;

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  span {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

// <S.Title>
// <img src={ASSET_LINK + '/untheboaed.png'} />

// </S.Title>

// <S.MyLuck>
// <img src={ASSET_LINK + '/myluck.png'} />

// </S.MyLuck>

// <S.WhatIs>
// <img src={ASSET_LINK + '/Whatismyluck.png'} />

// </S.WhatIs>
// <S.Chukjae>
// <img src={ASSET_LINK + '/Chujae.png'} />

// </S.Chukjae>
// <S.Rio>
// <img src={ASSET_LINK + '/riooo.png'} />

// </S.Rio>
// <S.StartButton>
// <img src={ASSET_LINK + '/start_button.png'} />

// </S.StartButton>
