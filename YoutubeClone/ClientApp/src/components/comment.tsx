import { useCallback, useMemo, useState } from "react";
import { Avatar, Button, Link, Stack, Typography } from "@mui/material";
import { CommentSummary } from "../api/models";
import elapsedTimeToString from "../elapsed-time-to-string";
import LikeButton from "./like-button";
import DislikeButton from "./dislike-button";
import CommentTextField from "./comment-text-field";
import { ReplyList } from "./reply-list";

const Comment = (props: CommentSummary) => {
    const { id, videoId, userName, userProfilePictureUrl, text, likes, dislikes, replies, dateCreated } = props;

    const [replyListVisible, setReplyListVisible] = useState<boolean>(false);
    const [replyTextVisible, setReplyTextVisible] = useState<boolean>(false);

    const dateTime = useMemo(() => elapsedTimeToString(dateCreated.getTime() - Date.now()), [dateCreated]);

    const showReplyText = useCallback(() => {
        setReplyTextVisible(true);
    }, []);

    const hideReplyText = useCallback(() => {
        setReplyTextVisible(false);
    }, []);

    const handleClickToggleShowReplyList = useCallback(() => {
        setReplyListVisible(!replyListVisible);
    }, [replyListVisible]);

    return (
        <Stack direction="row" spacing={2}>
            <Avatar src={userProfilePictureUrl} />
            <Stack flex={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2">{userName}</Typography>
                    <Typography variant="caption">{dateTime}</Typography>
                </Stack>
                <Typography variant="body1">{text}</Typography>
                <Stack direction="row">
                    <LikeButton likes={likes} />
                    <DislikeButton dislikes={dislikes} />
                    <Button onClick={showReplyText}>Reply</Button>
                </Stack>
                {
                    replyTextVisible &&
                    <CommentTextField videoId={videoId} parentCommentId={id} onSubmitComment={hideReplyText} onCancelComment={hideReplyText} />
                }
                {
                    replies > 0 &&
                    <Link onClick={handleClickToggleShowReplyList} marginBottom={1}>{replyListVisible ? 'Hide' : 'Show'} {replies} replies</Link>
                }
                {
                    replyListVisible && <ReplyList commentId={id} />
                }
            </Stack>
        </Stack>
    );
}

export default Comment;