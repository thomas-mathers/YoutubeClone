import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { CommentSummary, VideoSummary } from "../api/models";
import { getVideo, getVideoComments } from "../api/services/video-service";
import CollapsibleText from "./collapsible-text";
import CommentList from "./comment-list";
import DislikeButton from "./dislike-button";
import LikeButton from "./like-button";
import NotificationButton from "./notification-button";
import SubscribeButton from "./subscribe-button";

interface VideoPageProps { }

interface VideoPageState {
    video: VideoSummary;
    comments: CommentSummary[];
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
        title: '',
        description: "Let's look at how to add or change our naming styles in Visual Studio. Full Courses: https://iamtimcorey.com Patreon: https://www.patreon.com/IAmTimCorey Mailing List: https://signup.iamtimcorey.com/",
        thumbnailUrl: '',
        url: '',
        views: 0,
        likes: 0,
        dislikes: 0,
        dateCreated: ''
    },
    comments: [],
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
    FetchCommentsPageFailure
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
        default:
            return s;
    }
};

const VideoPage = (props: VideoPageProps) => {
    const params = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);

    const { video, comments, fetchingComments } = state;

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

    const fetchNextCommentsPage = useCallback(async () => {
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

    useEffect(() => {
        if (params.id) {
            fetchVideo();
            fetchNextCommentsPage();
        }
    }, [params]);

    return (
        <Stack padding={2} spacing={2}>
            <video src={video.url} controls autoPlay />
            <Box>
                <Typography variant="h5">{video.title}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <Typography component="span">{video.views} views</Typography>
                        <Typography component="span">{video.dateCreated}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <LikeButton likes={video.likes} />
                        <DislikeButton dislikes={video.dislikes} />
                    </Stack>
                </Stack>
            </Box>
            <Divider />
            <Stack direction="row" spacing={1}>
                <Avatar src={video.channelThumbnailUrl} />
                <Box flex={1}>
                    <Typography>Thomas Mathers</Typography>
                    <Typography>1K subscribers</Typography>
                </Box>
                <SubscribeButton />
                <NotificationButton />
            </Stack>
            <CollapsibleText text={video.description} maxLines={3}/>
            <Divider />
            <CommentList comments={comments} fetching={fetchingComments} onFetchNextPage={fetchNextCommentsPage} />
        </Stack>
    );
}

export default VideoPage;