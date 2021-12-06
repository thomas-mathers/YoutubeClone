import * as React from 'react';
import { InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

interface UsernameFieldProps {
    label?: string;
    required?: boolean
}

const UsernameField = ({ label = 'Email', required = false }: UsernameFieldProps) => (
    <TextField
        label={label}
        InputProps={{
            startAdornment:
                <InputAdornment position="start">
                    <AccountCircle />
                </InputAdornment>
        }}
        required={required}
    />
)

export default UsernameField;