import styled from "styled-components";
import { FlexCenterStyle, WholeContainer } from "@S/style/responsive/display";

export const Text = styled.div`
  font-family: Happy;
  font-size: 4rem;
  line-height: 4rem;
  text-align: center;
  position: absolute;
  width: 80%;
  height: 80%;
  margin: auto;
  ${FlexCenterStyle};
  flex-direction: column;
  margin-top: 0.7rem;

  p {
    margin: 0;
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
