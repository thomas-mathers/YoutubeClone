import * as React from 'react';
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import UsernameField from './username-field';
import PasswordField from './password-field';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Container maxWidth="xs">
            <Stack spacing={2} padding={2}>
                <Typography variant="h2" align="center">Login</Typography>
                <UsernameField />
                <PasswordField />
                <Link to="/forgot-password">Forgot Password?</Link>
                <Button variant="contained">Login</Button>
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