import { createTheme, darkScrollbar } from '@mui/material';

let theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: darkScrollbar(),
            },
        },
    },
    palette: {
        mode: 'dark'
    },
    shape: {
        borderRadius: 1
    }
});

export default theme;