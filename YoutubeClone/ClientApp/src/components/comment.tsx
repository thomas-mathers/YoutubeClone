import { useCallback, useMemo, useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { CommentSummary } from "../api/models";
import elapsedTimeToString from "../elapsed-time-to-string";
import LikeButton from "./like-button";
import DislikeButton from "./dislike-button";
import CommentTextField from "./comment-text-field";
import { ReplyList } from "./reply-list";

const Comment = (props: CommentSummary) => {
    const { id, videoId, userName, userProfilePictureUrl, text, likes, dislikes, dateCreated } = props;

    const [replyVisible, setReplyVisible] = useState<boolean>(false);

    const dateTime = useMemo(() => elapsedTimeToString(dateCreated.getTime() - Date.now()), [dateCreated]);

    const handleClickReply = useCallback(() => {
        setReplyVisible(true);
    }, []);

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
                    <Button onClick={handleClickReply}>Reply</Button>
                </Stack>
                {
                    replyVisible &&
                    <CommentTextField videoId={videoId} parentCommentId={id} />
                }
                <ReplyList commentId={id}/>
            </Stack>
        </Stack>
    );
}

export default Comment;