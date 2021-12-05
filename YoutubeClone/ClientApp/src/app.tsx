import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './app.css';
import theme from './theme';
import Header from './header';
import Main from './main';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Main />
        </ThemeProvider>
    );
}

export default App;