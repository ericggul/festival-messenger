import { createGlobalStyle } from "styled-components";
import media from "styled-media-query";

export const palette = {};

export const zIndex = {
  base: 1,
  headerColor: 10,
  headerText: 150,
};

export const theme = {
  palette,
  zIndex,
};

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    
    ${media.lessThan("medium")`
       font-size: 12px;
    `};
  }

  body {
    margin: 0;

    @font-face{
      font-family: 'Seoul Namsan';
      src: url('/assets/fonts/SeoulNamsanM.ttf') format('truetype');
    }
    @font-face{
      font-family: 'Seoul Namsan';
      src: url('/assets/fonts/SeoulNamsanB.ttf') format('truetype');
      font-weight: bold;
    }
    @font-face{
      font-family: 'Seoul Namsan';
      src: url('/assets/fonts/SeoulNamsanL.ttf') format('truetype');
      font-weight: light;
    }
    @font-face{
      font-family: 'Seoul Namsan';
      src: url('/assets/fonts/SeoulNamsanVert.ttf') format('truetype');
      font-weight: medium;
    }

    font-family: 'Seoul Namsan', 'sans-serif';
    user-select: none;
    
    & ::selection {
      color: white;
    }
    
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    & ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }

    overscroll-behavior-y: none;
  }
  
  input, textarea, button {
    font-family: inherit;
  }
`;
