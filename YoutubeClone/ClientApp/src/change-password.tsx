import * as React from 'react';
import { Button, Stack, Typography, Container } from "@mui/material";
import PasswordField from './password-field';

const ChangePassword = () => {
    return (
        <Container maxWidth="xs">
            <Stack spacing={2} padding={2}>
                <Typography variant="h2" align="center">Change Password</Typography>
                <PasswordField label="Old Password" />
                <PasswordField label="New Password" />
                <PasswordField label="Confirm New Password" />
                <Button variant="contained">Change Password</Button>
            </Stack>
        </Container>
    );
};

export default ChangePassword