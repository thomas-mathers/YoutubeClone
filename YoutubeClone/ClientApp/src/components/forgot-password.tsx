import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import UsernameField from './username-field';

const ForgotPassword = () => {
    return (
        <Container maxWidth="xs">
            <Stack spacing={2} padding={2}>
                <Typography variant="h2" align="center">Forgot password?</Typography>
                <UsernameField />
                <Button variant="contained">Request password reset</Button>
            </Stack>
        </Container>
    );
};

export default ForgotPassword