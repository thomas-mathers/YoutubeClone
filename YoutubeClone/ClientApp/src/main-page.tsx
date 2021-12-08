import * as React from 'react';
import { Fragment, useState } from 'react';
import { Box, Stack } from "@mui/material";
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';
import FeedItemSummary from './feed-item-summary';
import UserSummary from './user-summary';

const MainPage = () => {
    const [user, setUser] = useState<UserSummary | null>(null);
    const [feedItems, setFeedItems] = useState<FeedItemSummary[]>([
        {
            videoId: '12345678',
            title: 'Thomas Mathers',
            channelName: 'Thomas Mathers',
            channelThumbnailUrl: '',
            thumbnailUrl: 'https://i.ytimg.com/an_webp/bzMTlBddJ-E/mqdefault_6s.webp?du=3000&sqp=COKpv40G&rs=AOn4CLAuCtxj7RdvpH4PHrdIVOpW-2N0Lg',
            views: 0,
            dateCreated: ''
        }
    ]);
    const [filters, setFilters] = useState<string[]>([
        'All',
        'Filter 1',
        'Filter 2',
        'Filter 3',
        'Filter 4',
        'Filter 5',
        'Filter 6',
        'Filter 7',
        'Filter 8',
        'Filter 9',
        'Filter 10',
    ]);

    return (
        <Fragment>
            <Header user={user}/>
            <Box display="flex">
                <AppDrawer open={true} />
                <Stack component="main" spacing={2} padding={2} flexGrow={1} overflow="hidden">
                    <FeedFilterChipBar filters={filters} />
                    <Feed items={feedItems} />
                </Stack>
            </Box>
        </Fragment>
    )
};

export default MainPage;
