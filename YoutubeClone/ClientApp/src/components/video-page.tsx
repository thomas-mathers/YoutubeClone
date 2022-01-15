import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { getVideo } from "../api/services/video-service";
import CollapsibleText from "./collapsible-text";
import CommentTextField from "./comment-text-field";
import CommentList from "./comment-list";
import VideoPrimaryInfo from "./video-primary-info";
import VideoSecondaryInfo from "./video-secondary-info";
import VideoPlayer from "./video-player";
import Header from "./header";

const VideoPage = () => {
    const { id } = useParams();

    const { data: video } = useQuery(['video', id], () => getVideo(id!), {
        initialData: {
            id: '',
            channelId: '',
            channelName: '',
            channelThumbnailUrl: '',
            channelSubscriptions: 0,
            title: '',
            description: '',
            thumbnailUrl: '',
            url: '',
            views: 0,
            likes: 0,
            comments: 0,
            dislikes: 0,
            dateCreated: new Date()
        }
    });

    return (
        <Box>
            <Header />
            <Box padding={2}>
                <Container maxWidth="lg" disableGutters>
                    <Stack spacing={2}>
                        <VideoPlayer src={video!.url} />
                        <VideoPrimaryInfo title={video!.title} views={video!.views} dateCreated={video!.dateCreated} likes={video!.likes} dislikes={video!.dislikes} />
                        <Divider />
                        <VideoSecondaryInfo channelThumbnailUrl={video!.channelThumbnailUrl} channelName={video!.channelName} channelSubscriptions={video!.channelSubscriptions} />
                        <CollapsibleText text={video!.description} maxLines={3} />
                        <Divider />
                        <Stack direction="row">
                            <Typography>{video!.comments} comments</Typography>
                        </Stack>
                        <CommentTextField videoId={id!}/>
                        <CommentList videoId={id!} />
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

export default VideoPage;