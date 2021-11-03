import { ThemeOptions, createTheme } from '@mui/material';

const themeOptions: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1F1FD5',
            contrastText: 'white',
        },
        secondary: {
            main: '#ffc921',
        },
        text: {
            primary: 'rgba(0,0,0,0.87)',
        },
        divider: 'rgba(162,150,150,0.12)',
    },
    typography: {
        fontFamily: 'Public Sans, sans-serif',
        fontSize: 14,
        h1: {
            fontWeight: 600,
        },
    },
    spacing: 8,
});
export default themeOptions;
