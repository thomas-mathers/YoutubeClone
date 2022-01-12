import { useCallback, useMemo, useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import elapsedTimeToString from "../elapsed-time-to-string";
import LikeButton from "./like-button";
import DislikeButton from "./dislike-button";
import CommentTextField from "./comment-text-field";
import { ReplyList } from "./reply-list";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { createReply, getReplies } from "../api/services/comment-service";
import { useAuthService } from "../hooks/use-auth-service";

interface CommentProps {
    id: string;
    userName: string;
    userProfilePictureUrl: string;
    text: string;
    likes: number;
    dislikes: number;
    dateCreated: Date;
}

const Comment = (props: CommentProps) => {
    const { token, user } = useAuthService();

    const queryClient = useQueryClient();

    const { id, userName, userProfilePictureUrl, text, likes, dislikes, dateCreated } = props;

    const { data: replyPages, isFetching: fetchingReplies, hasNextPage: hasMoreReplies, fetchNextPage: fetchNextReplies } = useInfiniteQuery(
        ['replies', id],
        ({ pageParam = undefined }) => getReplies({ commentId: id, continueToken: pageParam }),
        {
            getNextPageParam: (lastPage,) => lastPage.continueToken ?? undefined
        });

    const replies = useMemo(() => {
        if (!replyPages) {
            return [];
        }
        return replyPages.pages.flatMap(x => x.rows);
    }, [replyPages]);

    const totalReplies = useMemo(() => {
        if (!replyPages || replyPages.pages.length === 0) {
            return 0;
        }
        return replyPages.pages[0].totalRows;
    }, [replyPages]);

    const createReplyMutation = useMutation('createReply',
        (x) => createReply({ token: token!, commentId: id, body: { text: replyText, userId: user!.id } }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('replies');
            }
        });

    const [replyVisible, setReplyVisible] = useState<boolean>(false);
    const [replyText, setReplyText] = useState<string>('');

    const dateTime = useMemo(() => elapsedTimeToString(dateCreated.getTime() - Date.now()), [dateCreated]);

    const handleCancelComment = useCallback(() => {
        setReplyVisible(false);
        setReplyText('');
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
                    <CommentTextField text={replyText} onChangeText={setReplyText} onCancelComment={handleCancelComment} onSubmitComment={createReplyMutation.mutate} />
                }
                <ReplyList totalReplies={totalReplies} replies={replies} fetching={fetchingReplies} hasNextPage={hasMoreReplies ?? false} onFetchNextPage={fetchNextReplies} />
            </Stack>
        </Stack>
    );
}

export default Comment;