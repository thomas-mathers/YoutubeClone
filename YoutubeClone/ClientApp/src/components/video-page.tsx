import { useCallback, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { createComment, getVideo } from "../api/services/video-service";
import { useAuthService } from "../hooks/use-auth-service";
import CollapsibleText from "./collapsible-text";
import CommentTextField from "./comment-text-field";
import CommentList from "./comment-list";
import VideoPrimaryInfo from "./video-primary-info";
import VideoSecondaryInfo from "./video-secondary-info";
import VideoPlayer from "./video-player";
import Header from "./header";

interface VideoPageState {
    commentText: string;
}

var initialState: VideoPageState = {
    commentText: '',
}

enum VideoPageActionType {
    CommentTextChanged
}

interface VideoPageAction {
    type: VideoPageActionType;
    payload?: any;
}

const reducer = (s: VideoPageState, a: VideoPageAction): VideoPageState => {
    switch (a.type) {
        case VideoPageActionType.CommentTextChanged:
            return {
                ...s,
                commentText: a.payload
            }
        default:
            return s;
    }
};

const VideoPage = () => {
    const { token, user } = useAuthService();

    const queryClient = useQueryClient();

    const { id } = useParams();

    const [state, dispatch] = useReducer(reducer, initialState);

    const { commentText } = state;

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
            dislikes: 0,
            dateCreated: new Date()
        }
    });

    const createCommentMutation = useMutation('createComment',
        (x) => createComment({ token: token!, videoId: id!, body: { text: commentText, userId: user!.id } }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('comments');
            }
        });

    const handleChangeCommentText = useCallback((text: string) => {
        dispatch({ type: VideoPageActionType.CommentTextChanged, payload: text });
    }, []);

    const handleCancelComment = useCallback(() => {
        dispatch({ type: VideoPageActionType.CommentTextChanged, payload: '' });
    }, []);

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
                            <Typography>{0} comments</Typography>
                        </Stack>
                        <CommentTextField text={commentText} onChangeText={handleChangeCommentText} onCancelComment={handleCancelComment} onSubmitComment={createCommentMutation.mutate} />
                        <CommentList videoId={id!} />
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

export default VideoPage;