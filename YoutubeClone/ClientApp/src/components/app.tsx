import { CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from './change-password';
import ForgotPassword from './forgot-password';
import Login from './login';
import HomePage from './home-page';
import ResetPassword from './reset-password';
import SignUp from './sign-up';
import theme from '../theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
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