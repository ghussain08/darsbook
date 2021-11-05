import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import SiteContainer from './components/site-container';
import Routes from './routes/index.routes';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import fontRegular from './fonts/Manrope-Regular.ttf';
import fontLight from './fonts/Manrope-Light.ttf';
import fontBold from './fonts/Manrope-Bold.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Mont;
    src: url(${fontRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: Mont;
    src: url(${fontLight}) format('truetype');
    font-weight: 300;
    font-style: light;
    font-display: auto;
  }
  @font-face {
    font-family: Mont;
    src: url(${fontBold}) format('truetype');
    font-weight: 700;
    font-style: bold;
    font-display: auto;
  }

`;
export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyle />
                <SiteContainer>
                    <Routes />
                </SiteContainer>
            </ThemeProvider>
        </Provider>
    );
}
