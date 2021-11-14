import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import SiteContainer from "./components/site-container";
import Routes from "./routes/index.routes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import GlobalStyle from "./components/global-style";
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
