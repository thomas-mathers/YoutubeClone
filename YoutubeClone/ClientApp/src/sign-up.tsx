import * as React from 'react';
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import PasswordField from './password-field';
import UsernameField from './username-field';

const SignUp = () => {
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
                <Button variant="contained">Go Back</Button>
            </Stack>
        </Container>
    );
};

export default SignUp