import { Children, cloneElement, ReactNode } from 'react';
import { Grid, Box, CircularProgress, Typography, Stack, GridSize } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';

interface InfiniteScrollerProps {
    xs?: boolean | GridSize;
    sm?: boolean | GridSize;
    md?: boolean | GridSize;
    lg?: boolean | GridSize;
    xl?: boolean | GridSize;
    children: ReactNode;
    fetching: boolean;
    hasNextPage: boolean;
    onFetchNextPage: () => void;
}

const InfiniteScroller = (props: InfiniteScrollerProps) => {
    const { fetching, hasNextPage, onFetchNextPage, children, xs = 12, sm = undefined, md = undefined, lg = undefined, xl = undefined } = props;

    const [sentryRef] = useInfiniteScroll({ loading: fetching, hasNextPage: hasNextPage, onLoadMore: onFetchNextPage })

    return (
        <Box style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Grid container spacing={2}>
                {
                    Children.map(children, (child: any) => <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>{cloneElement(child)}</Grid>)
                }
            </Grid>
            <Box ref={sentryRef}></Box>
            <Stack style={{visibility: (fetching ? 'visible' : 'hidden')}} direction="row" spacing={2} padding={2} alignItems="center" justifyContent="center">
                <Typography>Loading...</Typography>
                <CircularProgress />
            </Stack>
        </Box>
    );
}

export default InfiniteScroller;