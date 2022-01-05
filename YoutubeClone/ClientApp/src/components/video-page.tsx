import { Container, Divider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { CommentSummary, UserSummary, VideoDetail } from "../api/models";
import { createComment, getVideo, getVideoComments } from "../api/services/video-service";
import CollapsibleText from "./collapsible-text";
import CommentTextField from "./comment-text-field";
import CommentList from "./comment-list";
import VideoPrimaryInfo from "./video-primary-info";
import VideoSecondaryInfo from "./video-secondary-info";
import VideoPlayer from "./video-player";

interface VideoPageProps {
    token?: string;
    user?: UserSummary;
}

interface VideoPageState {
    video: VideoDetail;
    comments: CommentSummary[];
    commentContinueToken: string;
    commentCount: number;
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
    commentCount: 0,
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
            return {
                ...s,
                fetchingComments: false,
                comments: s.comments.concat(a.payload.rows),
                commentContinueToken: a.payload.continuationToken
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

const VideoPage = (props: VideoPageProps) => {
    const params = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { token, user } = props;
    const { video, comments, commentContinueToken, commentCount, commentText, fetchingComments } = state;

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

    const fetchNextCommentsPage = useCallback(async (continueToken?: string | null) => {
        const id = params.id;
        if (id && continueToken !== null) {
            try {
                dispatch({ type: VideoPageActionType.FetchCommentsPage });
                const comments = await getVideoComments(id, continueToken);
                dispatch({ type: VideoPageActionType.FetchCommentsPageSuccess, payload: comments });
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
            } catch (e) {
                dispatch({ type: VideoPageActionType.PostCommentFailure, payload: e });
            }
        }
    }, [token, user, params, commentText]);

    useEffect(() => {
        if (params.id) {
            fetchVideo();
            fetchNextCommentsPage();
        }
    }, [params, fetchVideo, fetchNextCommentsPage]);

    const handleFetchNextCommentsPage = useCallback(() => fetchNextCommentsPage(commentContinueToken), [fetchNextCommentsPage, commentContinueToken]);

    return (
        <Container maxWidth="lg">
            <Stack padding={2} spacing={2} height="100%">
                <VideoPlayer src={video.url} />
                <VideoPrimaryInfo title={video.title} views={video.views} dateCreated={video.dateCreated} likes={video.likes} dislikes={video.dislikes} />
                <Divider />
                <VideoSecondaryInfo channelThumbnailUrl={video.channelThumbnailUrl} channelName={video.channelName} channelSubscriptions={video.channelSubscriptions} />
                <CollapsibleText text={video.description} maxLines={3} />
                <Divider />
                <Stack direction="row">
                    <Typography>{commentCount} comments</Typography>
                </Stack>
                <CommentTextField text={commentText} onChangeText={handleChangeCommentText} onCancelComment={handleCancelComment} onSubmitComment={handleSubmitComment} />
                <CommentList comments={comments} fetching={fetchingComments} onFetchNextPage={handleFetchNextCommentsPage} />
            </Stack>
        </Container>
    );
}

export default VideoPage;