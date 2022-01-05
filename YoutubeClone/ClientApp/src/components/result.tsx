import { Avatar, Card, CardActionArea, CardContent, CardMedia, Stack, Typography, Zoom } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import elapsedTimeToString from "../elapsed-time-to-string";

interface ResultProps {
    id: string;
    index: number;
    thumbnailUrl: string;
    title: string;
    channelThumbnailUrl: string;
    channelName: string;
    views: number;
    dateCreated: Date;
}

const Result = (props: ResultProps) => {
    const { index, thumbnailUrl, channelThumbnailUrl, title, channelName, views, dateCreated } = props;

    const dateTime = useMemo(() => elapsedTimeToString(dateCreated.getTime() - new Date().getTime()), [dateCreated]);

    return (
        <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
            <Card>
                <CardActionArea component={Link} to={`/videos/${props.id}`}>
                    <CardMedia component="img" src={thumbnailUrl} />
                </CardActionArea>
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <Avatar src={channelThumbnailUrl} />
                        <Stack>
                            <Typography variant="subtitle1" component="div">{title}</Typography>
                            <Typography variant="caption" component="div">{channelName}</Typography>
                            <Typography variant="caption" component="span">{views} views</Typography>
                            <Typography variant="caption" component="span">{dateTime}</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Zoom>
    );
}

export default Result;