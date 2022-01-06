import * as React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import elapsedTimeToString from '../elapsed-time-to-string';

interface FeedItemProps {
    id: string;
    index: number;
    thumbnailUrl: string;
    title: string;
    channelThumbnailUrl: string;
    channelName: string;
    views: number;
    dateCreated: Date;
}

const FeedItem = (props: FeedItemProps) => {
    const { thumbnailUrl, channelThumbnailUrl, title, channelName, views, dateCreated } = props;

    const dateTime = useMemo(() => elapsedTimeToString(dateCreated.getTime() - new Date().getTime()), [dateCreated]);

    return (
        <Card>
            <CardActionArea component={Link} to={`/videos/${props.id}`}>
                <CardMedia component="img" src={thumbnailUrl} />
            </CardActionArea>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Avatar src={channelThumbnailUrl} />
                    <Stack style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                        <Typography variant="subtitle1" component="div" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Typography>
                        <Typography variant="caption" component="div">{channelName}</Typography>
                        <Typography variant="caption" component="span">{views} views</Typography>
                        <Typography variant="caption" component="span">{dateTime}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default FeedItem;
