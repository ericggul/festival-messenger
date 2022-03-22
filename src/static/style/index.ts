import { createGlobalStyle } from "styled-components";
import media from "styled-media-query";

export const palette = {};

export const zIndex = {};

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
