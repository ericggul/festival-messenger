import { createGlobalStyle } from "styled-components";
import media from "styled-media-query";

export const palette = {
  YELLOW: "#ecd458",
  TRANSPARENT_WHITE: `rgba(255, 255, 255, .7)`,
  CANCEL_RED: "#c58c8c",
};

export const zIndex = {
  base: 1,
  headerColor: 10,
  modalBackground: 50,
  modalContent: 51,
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
