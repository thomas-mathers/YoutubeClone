import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import './app.css';
import Header from './header';
import Main from './main';

let theme = createTheme({
    palette: {
        mode: 'dark'
    },
    shape: {
        borderRadius: 1
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container maxWidth="xl" disableGutters>
                <Main />
            </Container>
        </ThemeProvider>
    );
}

export default App;