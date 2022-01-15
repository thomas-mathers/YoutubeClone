import { useCallback, useMemo, useState } from "react";
import { Link, Stack } from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { getReplies } from "../api/services/comment-service";
import LoadMoreScroller from "./load-more-scroller"
import Comment from "./comment";

interface ReplyListProps {
    commentId: string;
}

const ReplyList = (props: ReplyListProps) => {
    const { commentId } = props;
    const [open, setOpen] = useState(false);

    const { data: replyPages, isFetching: fetchingReplies, hasNextPage: hasMoreReplies, fetchNextPage: fetchNextReplies, status } = useInfiniteQuery(
        ['comments', commentId],
        ({ pageParam = undefined }) => getReplies({ commentId: commentId, continueToken: pageParam, take: 5 }),
        {
            enabled: false,
            getNextPageParam: (lastPage,) => lastPage.continueToken ?? undefined
        });

    const replies = useMemo(() => {
        if (!replyPages) {
            return [];
        }
        return replyPages.pages.flatMap(x => x.rows);
    }, [replyPages]);

    const handleClickShowReplies = useCallback(() => {
        setOpen(true)
        if (status === 'idle') {
            fetchNextReplies();
        }
    }, [fetchNextReplies, status]);
    const handleClickHideReplies = useCallback(() => setOpen(false), []);

    return (
        <Stack spacing={2}>
            {
                open ?
                    <Link onClick={handleClickHideReplies}>Hide replies</Link>
                    :
                    <Link onClick={handleClickShowReplies}>View replies</Link>
            }
            {
                open &&
                <LoadMoreScroller fetching={fetchingReplies} hasNextPage={hasMoreReplies ?? false} onFetchNextPage={fetchNextReplies}>
                    {
                        replies.map(c => <Comment {...c}/>)
                    }
                </LoadMoreScroller>
            }
        </Stack>
    )
}

export { ReplyList }