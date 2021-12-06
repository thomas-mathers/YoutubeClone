import * as React from 'react';
import { Fragment } from 'react';
import { Box, Stack } from "@mui/material";
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';

const MainPage = () => (
    <Fragment>
        <Header />
        <Box display="flex">
            <AppDrawer open={true} />
            <Stack component="main" spacing={2} padding={2} flexGrow={1} overflow="hidden">
                <FeedFilterChipBar />
                <Feed />
            </Stack>
        </Box>
    </Fragment>
);

export default MainPage;
