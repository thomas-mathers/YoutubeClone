import * as React from 'react';
import { Fragment, useState } from 'react';
import { Box, Stack } from "@mui/material";
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';
import VideoSummary from './video-summary';

const MainPage = () => {
    const [videos, setVideos] = useState<VideoSummary[]>([
        {
            id: '12345678',
            channelId: '12345678',
            name: 'Thomas Mathers',
            url: 'https://i.ytimg.com/an_webp/bzMTlBddJ-E/mqdefault_6s.webp?du=3000&sqp=COKpv40G&rs=AOn4CLAuCtxj7RdvpH4PHrdIVOpW-2N0Lg',
            description: 'Test description',
            views: 0,
            likes: 0,
            dislikes: 0
        }
    ]);
    const [filters, setFilters] = useState<string[]>([
    ]);

    return (
        <Fragment>
            <Header />
            <Box display="flex">
                <AppDrawer open={true} />
                <Stack component="main" spacing={2} padding={2} flexGrow={1} overflow="hidden">
                    <FeedFilterChipBar filters={filters} />
                    <Feed videos={videos} />
                </Stack>
            </Box>
        </Fragment>
    )
};

export default MainPage;
