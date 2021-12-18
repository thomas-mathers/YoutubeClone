import * as React from 'react';
import { useCallback } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import useLocallyPersistedReducer from '../hooks/use-locally-persisted-reducer';
import ChangePassword from './change-password';
import ForgotPassword from './forgot-password';
import Login from './login';
import HomePage from './home-page';
import ResetPassword from './reset-password';
import SignUp from './sign-up';
import theme from '../theme';
import { UserSummary } from '../api/models';

interface AppState {
    user?: UserSummary;
    token?: string;
}

enum AppActionType {
    Login,
    Logout
}

interface AppAction {
    type: AppActionType;
    payload?: any
}

const reducer = (state: AppState, action: AppAction) => {
    switch (action.type) {
        case AppActionType.Login:
            const { user, token } = action.payload;
            return {
                ...state,
                user: user,
                token: token
            };
        case AppActionType.Logout:
            return {
                ...state,
                user: undefined,
                token: undefined
            };
    }
}

function App() {
    const [state, dispatch] = useLocallyPersistedReducer(reducer, { user: undefined, token: undefined }, 'appState');

    const handleLogin = useCallback((user: UserSummary, token: string) => {
        dispatch({ type: AppActionType.Login, payload: { user: user, token: token } });
    }, []);

    const handleLogout = useCallback(() => {
        dispatch({ type: AppActionType.Logout });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage user={state.user} token={state.token} onClickLogout={handleLogout} />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/login" element={<Login onClickLogin={handleLogin} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;