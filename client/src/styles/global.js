import { createGlobalStyle } from "styled-components";
import Reset from "./reset";
import Lack from "../fonts/lack-regular-webfont.woff";

const GlobalStyle = createGlobalStyle`
${Reset}

@font-face {
  font-family: 'Lack';
  src: local('Lack'), local('Lack'),
  url(${Lack}) format('woff');
  font-weight: 400;
  font-style: normal;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  position: relative;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.color};
  font-family: ${props => props.theme.font};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: color .22s ease-in-out, background-color .22s ease-in-out;
}

#root {
  min-height: 100vh; /* used to keep footer at bottom */
  display: flex; /* used to keep footer at bottom */
  flex-direction: column; /* used to keep footer at bottom */
}

#content {
  flex: 1 0 auto; /* used to keep footer at bottom */
}

footer {
  flex-shrink: 0; /* used to keep footer at bottom */
}

/* button reset */
button {
  cursor: pointer;
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;
  /* Normalize "line-height". Cannot be changed from "normal" in Firefox 4+. */
  line-height: normal;
  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  /* Corrects inability to style clickable "input" types in iOS */
  -webkit-appearance: none;
  /* Remove excess padding and border in Firefox 4+ */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
}

/*
  iOS fixes:
  "Font-size" fixes the issue with zoom in on iOS
  "appearance" fixes box-shadow not showing on iOS
*/
@media (min-width: 320px) and (max-width: 1024px) {
  textarea,
  input,
  label[for=file] {
    font-size: 16px !important;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
}
`;

export default GlobalStyle;
