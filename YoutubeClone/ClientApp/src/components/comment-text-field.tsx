import { Avatar, Button, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createComment } from "../api/services/comment-service";
import { useAuthService } from "../hooks/use-auth-service";

interface CommentTextFieldProps {
    videoId: string;
    parentCommentId?: string;
    onCancelComment?: () => void;
    onSubmitComment?: () => void;
}

const CommentTextField = (props: CommentTextFieldProps) => {
    const { videoId, parentCommentId, onCancelComment, onSubmitComment } = props;

    const { token, user } = useAuthService();

    const queryClient = useQueryClient();

    const [commentText, setCommentText] = useState<string>('');

    const createCommentMutation = useMutation('createComment',
        (x) => createComment({ token: token!, body: { userId: user!.id, videoId: videoId, parentCommentId: parentCommentId, text: commentText } }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
            }
        });

    const handleChange = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const handleCancelComment = useCallback((e) => {
        setCommentText('');
        onCancelComment?.();
    }, [onCancelComment]);

    const handleSubmitComment = useCallback((e) => {
        setCommentText('');
        createCommentMutation.mutate();
        onSubmitComment?.();
    }, [createCommentMutation, onSubmitComment]);

    return (
        <Stack direction="row" spacing={2}>
            <Avatar src={user?.profilePictureUrl} />
            <Stack spacing={1} flex={1} alignItems="flex-end">
                <TextField variant="standard" placeholder="Add a public comment..." value={commentText} onChange={handleChange} fullWidth />
                <Stack direction="row">
                    <Button onClick={handleCancelComment}>Cancel</Button>
                    <Button onClick={handleSubmitComment}>Comment</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default CommentTextField;