import { Avatar, Button, Stack, Typography } from "@mui/material";
import LikeButton from "./like-button";
import DislikeButton from "./dislike-button";

interface CommentProps {
    userName: string;
    userProfilePictureUrl: string;
    text: string;
    likes: number;
    dislikes: number;
}

const Comment = (props: CommentProps) => {
    const { userName, userProfilePictureUrl, text, likes, dislikes } = props;

    return (
        <Stack direction="row" spacing={2}>
            <Avatar src={userProfilePictureUrl} />
            <Stack>
                <Typography>{userName}</Typography>
                <Typography>{text}</Typography>
                <Stack direction="row">
                    <LikeButton likes={likes} />
                    <DislikeButton dislikes={dislikes}/>
                    <Button>Reply</Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Comment;