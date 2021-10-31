import * as React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import SiteContainer from './components/site-container';
import Routes from './routes/index.routes';
import { store } from './redux/store';
import { Provider } from 'react-redux';
export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SiteContainer>
                    <Routes />
                </SiteContainer>
            </ThemeProvider>
        </Provider>
    );
}
