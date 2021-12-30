import { Avatar, Button, Stack, TextField } from "@mui/material";
import { useCallback } from "react";

interface CommentTextFieldProps {
    accountProfilePictureUrl?: string;
    text: string;
    onChangeText: (text: string) => void;
    onCancelComment: () => void;
    onSubmitComment: () => void;
}

const CommentTextField = (props: CommentTextFieldProps) => {
    const { accountProfilePictureUrl, text, onChangeText, onCancelComment, onSubmitComment } = props;

    const handleChange = useCallback((e) => {
        onChangeText(e.target.value);
    }, [onChangeText]);

    return (
        <Stack direction="row" spacing={2}>
            <Avatar src={accountProfilePictureUrl} />
            <Stack spacing={1} flex={1} alignItems="flex-end">
                <TextField variant="standard" placeholder="Add a public comment..." value={text} onChange={handleChange} fullWidth />
                <Stack direction="row">
                    <Button onClick={onCancelComment}>Cancel</Button>
                    <Button onClick={onSubmitComment}>Comment</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default CommentTextField;