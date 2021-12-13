import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import PasswordField from './password-field';
import UsernameField from './username-field';

const SignUp = () => {
    const navigate = useNavigate();
    
    return (
        <Container maxWidth="xs">
            <Stack spacing={2} padding={2}>
                <Typography variant="h2" align="center">Sign Up</Typography>
                <UsernameField required />
                <TextField label="Given name" />
                <TextField label="Surname" />
                <TextField label="Phone number" />
                <PasswordField required />
                <PasswordField label="Confirm Password" required />
                <Button variant="contained">Confirm</Button>
                <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
            </Stack>
        </Container>
    );
};

export default SignUp