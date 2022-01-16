import { useCallback, useMemo, useState } from "react";
import { Avatar, Box, Button, Icon, Link, Stack, Typography } from "@mui/material";
import { CommentSummary } from "../api/models";
import elapsedTimeToString from "../elapsed-time-to-string";
import LikeButton from "./like-button";
import DislikeButton from "./dislike-button";
import CommentTextField from "./comment-text-field";
import { ReplyList } from "./reply-list";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

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
            <Stack flex={1} spacing={1}>
                <Box>
                    <Box>
                        <Typography component="span" variant="subtitle2">{userName}</Typography>
                        <Typography component="span" variant="caption">{dateTime}</Typography>
                    </Box>
                    <Typography variant="body1">{text}</Typography>
                    <Stack direction="row" spacing={1}>
                        <LikeButton likes={likes} />
                        <DislikeButton dislikes={dislikes} />
                        <Button onClick={showReplyText}>Reply</Button>
                    </Stack>
                </Box>
                {
                    replyTextVisible &&
                    <CommentTextField videoId={videoId} parentCommentId={id} onSubmitComment={hideReplyText} onCancelComment={hideReplyText} />
                }
                {
                    replies > 0 && (
                        replyListVisible ?
                            <Link component="button" onClick={handleClickToggleShowReplyList}>
                                <Stack direction="row" spacing={1}>
                                    <Icon>
                                        <ArrowDropUp />
                                    </Icon>
                                    <Typography variant="body1">Hide {replies} replies</Typography>
                                </Stack>
                            </Link>
                            :
                            <Link component="button" onClick={handleClickToggleShowReplyList}>
                                <Stack direction="row" spacing={1}>
                                    <Icon>
                                        <ArrowDropDown />
                                    </Icon>
                                    <Typography variant="body1">Show {replies} replies</Typography>
                                </Stack>
                            </Link>
                    )

                }
                {
                    replyListVisible && <ReplyList commentId={id} />
                }
            </Stack>
        </Stack>
    );
}

export default Comment;