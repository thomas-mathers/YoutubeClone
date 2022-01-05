import { Children, cloneElement, ReactNode, useRef } from 'react';
import { Grid, Box, CircularProgress, Typography, Stack, GridSize } from '@mui/material';
import { useEffect } from 'react';

interface FeedProps {
    xs?: boolean | GridSize;
    sm?: boolean | GridSize;
    md?: boolean | GridSize;
    lg?: boolean | GridSize;
    xl?: boolean | GridSize;
    children: ReactNode;
    fetching: boolean;
    onFetchNextPage: () => void;
}

function isRectVisible(rect: DOMRect) {
    const bottom = window.innerHeight || document.documentElement.clientHeight;
    const right = window.innerWidth || document.documentElement.clientWidth;

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= bottom && rect.right <= right;
}

const InfiniteScroller = (props: FeedProps) => {
    const { fetching, children, onFetchNextPage, xs = 12, sm = undefined, md = undefined, lg = undefined, xl = undefined } = props;

    const lastElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function fetchItems() {
            if (lastElement.current) {
                const isLastElementVisible = isRectVisible(lastElement.current.getBoundingClientRect());

                if (isLastElementVisible) {
                    removeScrollEventHandler();
                    onFetchNextPage();
                }
            }
        }

        function attachScrollEventHandler() {
            window.addEventListener('scroll', fetchItems);
        }

        function removeScrollEventHandler() {
            window.removeEventListener('scroll', fetchItems);
        }

        attachScrollEventHandler();
        fetchItems();

        return () => removeScrollEventHandler();
    }, [onFetchNextPage]);

    return (
        <Box style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Grid container spacing={2}>
                {
                    Children.map(children, (child: any) => <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>{cloneElement(child)}</Grid>)
                }
            </Grid>
            <Box ref={lastElement}></Box>
            {
                fetching &&
                <Stack direction="row" spacing={2} padding={2} alignItems="center" justifyContent="center">
                    <Typography>Loading...</Typography>
                    <CircularProgress />
                </Stack>
            }
        </Box>
    );
}

export default InfiniteScroller;