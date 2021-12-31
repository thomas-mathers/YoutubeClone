import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import ChangePassword from './change-password';
import ForgotPassword from './forgot-password';
import Login from './login';
import HomePage from './home-page';
import ResetPassword from './reset-password';
import SignUp from './sign-up';
import VideoPage from './video-page';
import AuthServiceProvider from './auth-service-provider';
import ResultsPage from './results-page';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthServiceProvider>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/results" element={<ResultsPage />} />
                        <Route path="/videos/:id" element={<VideoPage />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                    </Routes>
                </BrowserRouter>
            </AuthServiceProvider>
        </ThemeProvider>
    );
}

export default App;