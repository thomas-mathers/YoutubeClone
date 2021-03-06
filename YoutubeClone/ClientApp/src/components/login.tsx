import * as React from 'react';
import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { login as loginRequest } from '../api/services/auth-service';
import { useAuthService } from '../hooks/use-auth-service';
import UsernameField from './username-field';
import PasswordField from './password-field';

interface LoginProps {}

const Login = (props: LoginProps) => {
    const { login } = useAuthService();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLoginClick = useCallback(async () => {
        try {
            const response = await loginRequest({ username: username, password: password });
            login(response.user, response.token);
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    }, [username, password, login, navigate]);

    return (
        <Container maxWidth="xs">
            <Stack spacing={2} padding={2}>
                <Typography variant="h2" align="center">Login</Typography>
                <UsernameField value={username} onChange={setUsername} />
                <PasswordField value={password} onChange={setPassword} />
                <Link to="/forgot-password">Forgot Password?</Link>
                <Button variant="contained" onClick={(e) => handleLoginClick()}>Login</Button>
                <Divider>Or</Divider>
                <Button variant="contained">Facebook</Button>
                <Button variant="contained">Google</Button>
                <Button variant="contained">Twitter</Button>
                <Divider />
                <Typography align="center">Don't have an account? <Link to="/sign-up">Sign up</Link></Typography>
            </Stack>
        </Container>
    );
};

export default Login