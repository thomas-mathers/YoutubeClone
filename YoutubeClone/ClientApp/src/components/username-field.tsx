import * as React from 'react';
import { InputAdornment, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

interface UsernameFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    label?: string;
}

const UsernameField = (props: UsernameFieldProps) => {
    const { value, onChange, label = 'Email', required = false } = props;
    return (
        <TextField
            label={label}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            InputProps={{
                startAdornment:
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
            }}
            required={required}
        />
    )
}

export default UsernameField;