import { createGlobalStyle } from "styled-components";
import TrebuchetMSFont from "../../static/fonts/Trebuchet-MS.ttf";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Trebuchet MS';
        src: url(${TrebuchetMSFont}) format('truetype');
        font-style: normal;
        font-display: auto;
    }
    :root {
        font-family: 'Trebuchet MS';
    }
`;

export default GlobalStyle;
