import * as React from 'react';
import { useState, useCallback } from 'react';
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface PasswordFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    required?: boolean;
}

const PasswordField = (props: PasswordFieldProps) => {
    const { value, onChange, label = 'Password', required = false } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleVisibility = useCallback(() => setShowPassword(!showPassword), [showPassword]);

    return (
        <TextField
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            label={label}
            InputProps={{
                type: showPassword ? 'text' : 'password',
                startAdornment:
                    <InputAdornment position="start">
                        <Key />
                    </InputAdornment>,
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton onClick={(e) => toggleVisibility()}>
                            {
                                showPassword ? <VisibilityOff /> : <Visibility />
                            }
                            
                        </IconButton>
                    </InputAdornment>
            }}
            required={required}
        />
    );
}

export default PasswordField;