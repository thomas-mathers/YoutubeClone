import * as React from 'react';
import { useCallback } from 'react';
import { Grid, Box, CircularProgress, Typography, Stack } from '@mui/material';
import AutoSizer from "react-virtualized-auto-sizer";
import { VideoSummary } from "../api/models";
import FeedItem from "./feed-item";

interface FeedProps {
    fetching: boolean;
    items: VideoSummary[];
    onScrollToBottom: () => void;
}

const Feed = (props: FeedProps) => {
    const { fetching, items, onScrollToBottom } = props;

    const handleScroll = useCallback((e: any) => {
        const bottom = e.target.scrollHeight - Math.ceil(e.target.scrollTop) === e.target.clientHeight;
        if (bottom) {
            onScrollToBottom();
        }
    }, [onScrollToBottom]);

    return (
        <Box style={{ width: '100%', height: '100%', overflowY: 'auto' }} onScroll={handleScroll}>
            <Grid container>
                {
                    items.map(v => (
                        <Grid item xs={12} sm={6} md={4} xl={3}>
                            <FeedItem key={v.id}
                                thumbnailUrl={v.thumbnailUrl}
                                title={v.title}
                                channelThumbnailUrl={v.channelThumbnailUrl}
                                channelName={v.channelName}
                                views={v.views}
                                dateCreated={v.dateCreated} />
                        </Grid>
                    ))
                }
                {
                    fetching &&
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2} padding={2} alignItems="center" justifyContent="center">
                            <Typography>Loading...</Typography>
                            <CircularProgress />
                        </Stack>
                    </Grid>
                }
            </Grid>
        </Box>
    );
}

export default Feed;
