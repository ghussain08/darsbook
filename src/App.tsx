import * as React from "react";
import {
  Container,
  Typography,
  Box,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import theme from "./theme/theme";
import SiteContainer from "./components/site-container";
import ResponsiveDrawer from "./components/header";
import Routes from "./routes/index.routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteContainer>
        <Routes />
      </SiteContainer>
    </ThemeProvider>
  );
}
