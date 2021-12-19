import React from "react";
import { ReactNode } from "react";
import { styled } from '@mui/system';

interface OutlinedBoxProps {
    children: ReactNode;
    label: string;
}

const Fieldset = styled('fieldset')(({ theme }) => ({
    border: '1px solid rgba(255,255,255,0.23)',
    paddingRight: theme.spacing(1)
}));

const Legend = styled('legend')(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontSize: '0.75em'
}));

const OutlinedBox = ({ children, label }: OutlinedBoxProps) => {
    return (
        <Fieldset>
            <Legend>{label}</Legend>
            {children}
        </Fieldset>
    );
};

export default OutlinedBox;