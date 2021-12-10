import * as React from 'react';
import { Chip, Stack } from "@mui/material";

interface FeedFilterChipBarProps {
    filters: string[]
    onClick?: (filter: string) => void;
}

const FeedFilterChipBar = (props: FeedFilterChipBarProps) => {
    return (
        <Stack direction="row" spacing={1} overflow="auto">
            {
                props.filters.map((v, i) => <Chip key={i} label={v} clickable/>)
            }
        </Stack>
    )
}

export default FeedFilterChipBar;