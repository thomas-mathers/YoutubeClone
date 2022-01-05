import * as React from 'react';
import { Box } from "@mui/material";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';

const HomePage = () => {
    return (
        <Box>
            <Header/>
            <Box padding={2}>
                <FeedFilterChipBar filters={[]} />
                <Feed />
            </Box>
        </Box>
    )
};

export default HomePage;
