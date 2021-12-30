import { Avatar, Box, Stack, Typography } from "@mui/material"
import SubscribeButton from "./subscribe-button";
import NotificationButton from "./notification-button";

interface VideoSecondaryInfoProps {
    channelThumbnailUrl: string;
    channelName: string;
    channelSubscriptions: number;
}

const VideoSecondaryInfo = (props: VideoSecondaryInfoProps) => {
    const { channelThumbnailUrl, channelName, channelSubscriptions } = props;

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2}>
                <Avatar src={channelThumbnailUrl} />
                <Box>
                    <Typography>{channelName}</Typography>
                    <Typography>{channelSubscriptions} subscribers</Typography>
                </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
                <SubscribeButton />
                <NotificationButton />
            </Stack>
        </Stack>
    );
}

export default VideoSecondaryInfo;