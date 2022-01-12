import { Children, cloneElement, ReactNode } from 'react';
import { Grid, Box, GridSize, Button } from '@mui/material';

interface LoadMoreScrollerProps {
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

const LoadMoreScroller = (props: LoadMoreScrollerProps) => {
    const { hasNextPage, onFetchNextPage, children, xs = 12, sm = undefined, md = undefined, lg = undefined, xl = undefined } = props;

    return (
        <Box style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Grid container spacing={2}>
                {
                    Children.map(children, (child: any) => <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>{cloneElement(child)}</Grid>)
                }
            </Grid>
            {
                hasNextPage &&
                <Button onClick={onFetchNextPage}>Load more</Button>
            }
        </Box>
    );
}

export default LoadMoreScroller;