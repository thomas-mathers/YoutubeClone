import * as React from 'react';
import { Button, Container, Stack, Typography } from "@mui/material";
import PasswordField from './password-field';

const ResetPassword = () => {
    return (
        <Container maxWidth="xs">
            <Stack spacing={2} padding={2}>
                <Typography variant="h2" align="center">Reset password</Typography>
                <PasswordField label="New Password" />
                <PasswordField label="Confirm Password" />
                <Button variant="contained">Reset password</Button>
            </Stack>
        </Container>
    );
};

export default ResetPassword