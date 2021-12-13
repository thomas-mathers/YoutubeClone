import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, Typography } from "@mui/material";
import UsernameField from './username-field';


const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="xs">
            <Stack spacing={2} padding={2}>
                <Typography variant="h2" align="center">Forgot password?</Typography>
                <UsernameField />
                <Button variant="contained">Request password reset</Button>
                <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
            </Stack>
        </Container>
    );
};

export default ForgotPassword