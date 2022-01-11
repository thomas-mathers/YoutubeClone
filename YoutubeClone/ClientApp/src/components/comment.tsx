import { useCallback, useMemo, useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import elapsedTimeToString from "../elapsed-time-to-string";
import LikeButton from "./like-button";
import DislikeButton from "./dislike-button";
import CommentTextField from "./comment-text-field";

interface CommentProps {
    userName: string;
    userProfilePictureUrl: string;
    text: string;
    likes: number;
    dislikes: number;
    dateCreated: Date;
}

const Comment = (props: CommentProps) => {
    const { userName, userProfilePictureUrl, text, likes, dislikes, dateCreated } = props;

    const [replyVisible, setReplyVisible] = useState<boolean>(false);
    const [replyText, setReplyText] = useState<string>('');

    const dateTime = useMemo(() => elapsedTimeToString(dateCreated.getTime() - Date.now()), [dateCreated]);

    const handleCancelComment = useCallback(() => {
        setReplyVisible(false);
        setReplyText('');
    }, []);

    const handleSubmitComment = useCallback(() => {
        console.log('submit reply');
    }, []);

    const handleClickReply = useCallback(() => {
        setReplyVisible(true);
    }, []);

    return (
        <Stack direction="row" spacing={2}>
            <Avatar src={userProfilePictureUrl} />
            <Stack flex={1}>
                <Stack direction="row" spacing={1}>
                    <Typography variant="body1">{userName}</Typography>
                    <Typography>{dateTime}</Typography>
                </Stack>
                <Typography>{text}</Typography>
                <Stack direction="row">
                    <LikeButton likes={likes} />
                    <DislikeButton dislikes={dislikes} />
                    <Button onClick={handleClickReply}>Reply</Button>
                </Stack>
                {
                    replyVisible &&
                    <CommentTextField text={replyText} onChangeText={setReplyText} onCancelComment={handleCancelComment} onSubmitComment={handleSubmitComment} />
                }
            </Stack>
        </Stack>
    );
}

export default Comment;