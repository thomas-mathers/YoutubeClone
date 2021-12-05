import * as React from 'react';
import { Box, Stack } from "@mui/material";
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";

const Main = () => (
    <Box display="flex">
        <AppDrawer open={true} />
        <Stack component="main" spacing={2} padding={2} flexGrow={1} overflow="hidden">
            <FeedFilterChipBar />
            <Feed />
        </Stack>
    </Box>
);

export default Main;
