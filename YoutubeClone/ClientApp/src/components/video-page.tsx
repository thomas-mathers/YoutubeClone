import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { CommentSummary, UserSummary, VideoDetail } from "../api/models";
import { createComment, getVideo, getVideoComments } from "../api/services/video-service";
import CollapsibleText from "./collapsible-text";
import CommentTextField from "./comment-text-field";
import CommentList from "./comment-list";
import DislikeButton from "./dislike-button";
import LikeButton from "./like-button";
import NotificationButton from "./notification-button";
import SubscribeButton from "./subscribe-button";

interface VideoPageProps {
    token?: string;
    user?: UserSummary;
}

interface VideoPageState {
    video: VideoDetail;
    comments: CommentSummary[];
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
            console.log('comments', a.payload)
            return {
                ...s,
                fetchingComments: false,
                comments: s.comments.concat(a.payload.rows)
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
    const { video, comments, commentCount, commentText, fetchingComments } = state;

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

    const handleFetchNextPage = useCallback(async () => {
        const id = params.id;
        if (id) {
            try {
                dispatch({ type: VideoPageActionType.FetchCommentsPage });
                const comments = await getVideoComments(id);
                dispatch({ type: VideoPageActionType.FetchCommentsPageSuccess, payload: comments });
            } catch (e) {
                dispatch({ type: VideoPageActionType.FetchCommentsPageFailure, payload: e });
            }
        }
    }, [params]);

    const handleChangeCommentText = useCallback((text: string) => {
        dispatch({ type: VideoPageActionType.CommentTextChanged, payload: text});
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

    const dateTime = useMemo(() => {
        const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'short', year: 'numeric'};
        return new Intl.DateTimeFormat('en', options).format(video.dateCreated);
    }, [video]);

    useEffect(() => {
        if (params.id) {
            fetchVideo();
            handleFetchNextPage();
        }
    }, [params, fetchVideo, handleFetchNextPage]);

    return (
        <Stack padding={2} spacing={2}>
            <video src={video.url} controls autoPlay />
            <Box>
                <Typography variant="h5">{video.title}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <Typography component="span">{video.views} views</Typography>
                        <Typography component="span">{dateTime}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <LikeButton likes={video.likes} />
                        <DislikeButton dislikes={video.dislikes} />
                    </Stack>
                </Stack>
            </Box>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2}>
                    <Avatar src={video.channelThumbnailUrl} />
                    <Box>
                        <Typography>{video.channelName}</Typography>
                        <Typography>{video.channelSubscriptions} subscribers</Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <SubscribeButton />
                    <NotificationButton />
                </Stack>
            </Stack>
            <CollapsibleText text={video.description} maxLines={3} />
            <Divider />
            <Stack direction="row">
                <Typography>{commentCount} comments</Typography>
            </Stack>
            <CommentTextField text={commentText} onChangeText={handleChangeCommentText} onCancelComment={handleCancelComment} onSubmitComment={handleSubmitComment}/>
            <CommentList comments={comments} fetching={fetchingComments} onFetchNextPage={handleFetchNextPage} />
        </Stack>
    );
}

export default VideoPage;