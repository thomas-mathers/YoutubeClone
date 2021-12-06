import { CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './app.css';
import ChangePassword from './change-password';
import ForgotPassword from './forgot-password';
import Login from './login';
import MainPage from './main-page';
import ResetPassword from './reset-password';
import SignUp from './sign-up';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;