import { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { CommentSummary, VideoDetail } from "../api/models";
import { createComment, getVideo, getVideoComments } from "../api/services/video-service";
import { useAuthService } from "../hooks/use-auth-service";
import CollapsibleText from "./collapsible-text";
import CommentTextField from "./comment-text-field";
import CommentList from "./comment-list";
import VideoPrimaryInfo from "./video-primary-info";
import VideoSecondaryInfo from "./video-secondary-info";
import VideoPlayer from "./video-player";
import Header from "./header";

interface VideoPageState {
    video: VideoDetail;
    comments: CommentSummary[];
    commentContinueToken: string;
    totalComments: number;
    commentText: string;
    fetchingVideo: boolean;
    fetchingVideoError: string;
    fetchingComments: boolean;
    fetchingCommentsError: string;
}

var initialState: VideoPageState = {
    video: {
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
    },
    comments: [],
    commentContinueToken: '',
    totalComments: 0,
    commentText: '',
    fetchingVideo: false,
    fetchingVideoError: '',
    fetchingComments: false,
    fetchingCommentsError: ''
}

enum VideoPageActionType {
    FetchVideo,
    FetchVideoSuccess,
    FetchVideoFailure,
    FetchCommentsPage,
    FetchCommentsPageSuccess,
    FetchCommentsPageFailure,
    CommentTextChanged,
    PostComment,
    PostCommentSuccess,
    PostCommentFailure
}

interface VideoPageAction {
    type: VideoPageActionType;
    payload?: any;
}

const reducer = (s: VideoPageState, a: VideoPageAction): VideoPageState => {
    switch (a.type) {
        case VideoPageActionType.FetchVideo:
            return {
                ...s,
                fetchingVideo: true,
                fetchingVideoError: ''
            }
        case VideoPageActionType.FetchVideoSuccess:
            return {
                ...s,
                fetchingVideo: false,
                video: a.payload
            }
        case VideoPageActionType.FetchVideoFailure:
            return {
                ...s,
                fetchingVideo: false,
                fetchingVideoError: a.payload
            }
        case VideoPageActionType.FetchCommentsPage:
            return {
                ...s,
                fetchingComments: true,
                fetchingCommentsError: ''
            }
        case VideoPageActionType.FetchCommentsPageSuccess:
            const { page, append } = a.payload;
            return {
                ...s,
                fetchingComments: false,
                commentContinueToken: page.continueToken,
                totalComments: page.totalRows,
                comments: append ? s.comments.concat(page.rows) : page.rows,
            }
        case VideoPageActionType.FetchCommentsPageFailure:
            return {
                ...s,
                fetchingComments: false,
                fetchingCommentsError: a.payload
            }
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
    const params = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { token, user } = useAuthService();
    const { video, comments, commentContinueToken, totalComments, commentText, fetchingComments } = state;

    const fetchVideo = useCallback(async () => {
        const id = params.id;
        if (id) {
            try {
                dispatch({ type: VideoPageActionType.FetchVideo });
                const video = await getVideo(id);
                dispatch({ type: VideoPageActionType.FetchVideoSuccess, payload: video });
            } catch (e) {
                dispatch({ type: VideoPageActionType.FetchVideoFailure, payload: e });
            }
        }
    }, [params]);

    const fetchCommentsPage = useCallback(async (continueToken?: string | null, append: boolean = true) => {
        const id = params.id;
        if (id && continueToken !== null) {
            try {
                dispatch({ type: VideoPageActionType.FetchCommentsPage });
                const page = await getVideoComments(id, continueToken);
                dispatch({ type: VideoPageActionType.FetchCommentsPageSuccess, payload: { page, append } });
            } catch (e) {
                dispatch({ type: VideoPageActionType.FetchCommentsPageFailure, payload: e });
            }
        }
    }, [params]);

    const handleChangeCommentText = useCallback((text: string) => {
        dispatch({ type: VideoPageActionType.CommentTextChanged, payload: text });
    }, []);

    const handleCancelComment = useCallback(() => {
        dispatch({ type: VideoPageActionType.CommentTextChanged, payload: '' });
    }, []);

    const handleSubmitComment = useCallback(async () => {
        const id = params.id;
        if (token && user && id) {
            try {                
                dispatch({ type: VideoPageActionType.PostComment });
                const comment = await createComment(token, id, { text: commentText, userId: user.id });
                dispatch({ type: VideoPageActionType.PostCommentSuccess, payload: comment });
                await fetchCommentsPage(undefined, false);
            } catch (e) {
                dispatch({ type: VideoPageActionType.PostCommentFailure, payload: e });
            }
        }
    }, [token, user, params, commentText, fetchCommentsPage]);

    useEffect(() => {
        fetchVideo();
    }, [fetchVideo]);

    const handleFetchNextCommentsPage = useCallback(() => fetchCommentsPage(commentContinueToken, true), [fetchCommentsPage, commentContinueToken]);

    return (
        <Box>
            <Header />
            <Box padding={2}>
                <Container maxWidth="lg" disableGutters>
                    <Stack spacing={2}>
                        <VideoPlayer src={video.url} />
                        <VideoPrimaryInfo title={video.title} views={video.views} dateCreated={video.dateCreated} likes={video.likes} dislikes={video.dislikes} />
                        <Divider />
                        <VideoSecondaryInfo channelThumbnailUrl={video.channelThumbnailUrl} channelName={video.channelName} channelSubscriptions={video.channelSubscriptions} />
                        <CollapsibleText text={video.description} maxLines={3} />
                        <Divider />
                        <Stack direction="row">
                            <Typography>{totalComments} comments</Typography>
                        </Stack>
                        <CommentTextField text={commentText} onChangeText={handleChangeCommentText} onCancelComment={handleCancelComment} onSubmitComment={handleSubmitComment} />
                        <CommentList comments={comments} fetching={fetchingComments} onFetchNextPage={handleFetchNextCommentsPage} />
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

export default VideoPage;