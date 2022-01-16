import { Children, cloneElement, ReactNode } from 'react';
import { Grid, Box, GridSize, Stack, Icon, Typography, Link } from '@mui/material';
import { SubdirectoryArrowRight } from '@mui/icons-material';

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
    fetchNextPageLabel: string;
}

const LoadMoreScroller = (props: LoadMoreScrollerProps) => {
    const { hasNextPage, onFetchNextPage, fetchNextPageLabel = 'Load more', children, xs = 12, sm = undefined, md = undefined, lg = undefined, xl = undefined } = props;

    return (
        <Box style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <Grid container spacing={2}>
                {
                    Children.map(children, (child: any) => <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>{cloneElement(child)}</Grid>)
                }
            </Grid>
            {
                hasNextPage &&
                <Link component="button" onClick={onFetchNextPage}>
                    <Stack direction="row" spacing={1}>
                        <Icon>
                            <SubdirectoryArrowRight />
                        </Icon>
                        <Typography>{fetchNextPageLabel}</Typography>
                    </Stack>
                </Link>
            }
        </Box>
    );
}

export default LoadMoreScroller;