import * as React from 'react';
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";

interface FeedItemProps {
    thumbnailUrl: string;
    title: string;
    channelThumbnailUrl: string;
    channelName: string;
    views: number;
    dateCreated: string;
}

const FeedItem = (props: FeedItemProps) => {
    const { thumbnailUrl, channelThumbnailUrl, title, channelName, views, dateCreated } = props;
    return (
        <Card>
            <CardActionArea>
                <CardMedia component="img" src={thumbnailUrl} />
            </CardActionArea>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Avatar src={channelThumbnailUrl} />
                    <Stack>
                        <Typography variant="subtitle1" component="div">{title}</Typography>
                        <Typography variant="caption" component="div">{channelName}</Typography>
                        <Typography variant="caption" component="span">{views} views</Typography>
                        <Typography variant="caption" component="span">{dateCreated}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default FeedItem;
