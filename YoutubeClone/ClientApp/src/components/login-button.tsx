import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function LoginButton() {
    return (
        <Button variant="contained" startIcon={<AccountCircle />} style={{ height: 40 }} component={Link} to="/login">Login</Button>
    )
}

export default LoginButton;