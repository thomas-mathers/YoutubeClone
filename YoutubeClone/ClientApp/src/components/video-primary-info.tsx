import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material"
import DislikeButton from "./dislike-button"
import LikeButton from "./like-button"

interface VideoPrimaryInfoProps {
    title: string;
    views: number;
    dateCreated: Date;
    likes: number;
    dislikes: number;
}

const VideoPrimaryInfo = (props: VideoPrimaryInfoProps) => {
    const { title, views, dateCreated, likes, dislikes } = props;

    const dateTime = useMemo(() => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en', options).format(dateCreated);
    }, [dateCreated]);

    return (
        <Box>
            <Typography variant="h5">{title}</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1}>
                    <Typography component="span">{views} views</Typography>
                    <Typography component="span">{dateTime}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <LikeButton likes={likes} />
                    <DislikeButton dislikes={dislikes} />
                </Stack>
            </Stack>
        </Box>
    );
}

export default VideoPrimaryInfo;