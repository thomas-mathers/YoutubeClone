import * as React from 'react';
import { Chip, Stack } from "@mui/material";

const FeedFilterChipBar = () => {
    return (
        <Stack direction="row" spacing={1} overflow="auto">
            <Chip clickable label="All" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
            <Chip clickable label="Gaming" />
        </Stack>
    )
}

export default FeedFilterChipBar;