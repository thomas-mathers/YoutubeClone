import { Children, cloneElement, ReactNode, useCallback } from 'react';
import { Grid, Box, CircularProgress, Typography, Stack } from '@mui/material';

interface FeedProps {
    children: ReactNode;
    fetching: boolean;
    onFetchNextPage: () => void;
}

const InfiniteScroller = (props: FeedProps) => {
    const { fetching, children, onFetchNextPage } = props;

    const handleScroll = useCallback((e: any) => {
        const y = Math.ceil(e.target.scrollHeight - e.target.scrollTop);
        const h = e.target.clientHeight;
        const thresh = 10;
        const bottom = Math.abs(y - h) <= thresh;

        if (bottom) {
            onFetchNextPage();
        }
    }, [onFetchNextPage]);

    return (
        <Box style={{ width: '100%', height: '100%', overflowY: 'auto' }} onScroll={handleScroll}>
            <Grid container spacing={2}>
                {
                    Children.map(children, (child: any) => <Grid item xs={12} sm={6} md={4} xl={3}>{cloneElement(child)}</Grid>)
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

export default InfiniteScroller;