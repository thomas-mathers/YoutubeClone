import { useMemo } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import elapsedTimeToString from "../elapsed-time-to-string";
import LikeButton from "./like-button";
import DislikeButton from "./dislike-button";

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

    const dateTime = useMemo(() => elapsedTimeToString(dateCreated.getTime() - Date.now()), [dateCreated]);

    return (
        <Stack direction="row" spacing={2}>
            <Avatar src={userProfilePictureUrl} />
            <Stack>
                <Stack direction="row" spacing={1}>
                    <Typography variant="body1">{userName}</Typography>
                    <Typography>{dateTime}</Typography>
                </Stack>
                <Typography>{text}</Typography>
                <Stack direction="row">
                    <LikeButton likes={likes} />
                    <DislikeButton dislikes={dislikes} />
                    <Button>Reply</Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Comment;