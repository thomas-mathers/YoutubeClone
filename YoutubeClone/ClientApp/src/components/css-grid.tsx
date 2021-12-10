import * as React from 'react';
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface CssGridProps {
    minWidth: number
    gap: number;
    children?: ReactNode;
}

const CssGrid = ({ gap, minWidth, children }: CssGridProps) => {
    const gridTemplateColumns = `repeat(auto-fit, minmax(${minWidth}px, 1fr))`;
    return <Box display="grid" gridTemplateColumns={gridTemplateColumns} gap={gap}>{children}</Box>
}

export default CssGrid;