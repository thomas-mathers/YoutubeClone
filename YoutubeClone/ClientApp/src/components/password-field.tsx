import * as React from 'react';
import { Key, Visibility } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface PasswordFieldProps {
    label?: string;
    required?: boolean;
}

const PasswordField = ({ label = 'Password', required = false }: PasswordFieldProps) => (
    <TextField
        label={label}
        InputProps={{
            startAdornment:
                <InputAdornment position="start">
                    <Key />
                </InputAdornment>,
            endAdornment:
                <InputAdornment position="end">
                    <IconButton>
                        <Visibility />
                    </IconButton>
                </InputAdornment>
        }}
        required={required}
    />
)

export default PasswordField;