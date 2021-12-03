import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface CssGridProps {
    xl: string;
    lg: string;
    md: string;
    sm: string;
    xs: string;
    gap: number;
    children?: ReactNode;
}

const CssGrid = ({ xl, lg, md, sm, xs, gap, children }: CssGridProps) => {
    const theme = useTheme();
    const isExtraLarge = useMediaQuery(theme.breakpoints.up("xl"));
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const isMedium = useMediaQuery(theme.breakpoints.up("md"));
    const isSmall = useMediaQuery(theme.breakpoints.up("sm"));

    let gridTemplateColumns = "";

    if (isExtraLarge) {
        gridTemplateColumns = xl;
    } else if (isLarge) {
        gridTemplateColumns = lg;
    } else if (isMedium) {
        gridTemplateColumns = md;
    } else if (isSmall) {
        gridTemplateColumns = sm;
    } else {
        gridTemplateColumns = xs;
    }

    return <Box display="grid" gridTemplateColumns={gridTemplateColumns} gap={gap}>{children}</Box>
}

export default CssGrid;