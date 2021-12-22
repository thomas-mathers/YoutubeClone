import * as React from 'react';
import { ReactNode } from "react";
import { Box } from "@mui/material";

interface CssGridProps {
    minWidth: number
    gap: number;
    children?: ReactNode;
}

const CssGrid = ({ gap, minWidth, children }: CssGridProps) => {
    return <Box display="flex" flexDirection="row" flexWrap="wrap" gap={gap}>{children}</Box>
}

export default CssGrid;