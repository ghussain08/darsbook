import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import SiteContainer from "./components/site-container";
import Routes from "./routes/index.routes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import GlobalStyle from "./components/global-style";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyle />
                <SiteContainer>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <Routes />
                    </LocalizationProvider>
                </SiteContainer>
            </ThemeProvider>
        </Provider>
    );
}
