import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { getReplies } from "../api/services/comment-service";
import LoadMoreScroller from "./load-more-scroller"
import Comment from "./comment";

interface ReplyListProps {
    commentId: string;
}

const ReplyList = (props: ReplyListProps) => {
    const { commentId } = props;

    const { data: replyPages, isFetching: fetchingReplies, hasNextPage: hasMoreReplies, fetchNextPage: fetchNextReplies } = useInfiniteQuery(
        ['comments', commentId],
        ({ pageParam = undefined }) => getReplies({ commentId: commentId, continueToken: pageParam, take: 5 }),
        {
            getNextPageParam: (lastPage,) => lastPage.continueToken ?? undefined
        });

    const replies = useMemo(() => {
        if (!replyPages) {
            return [];
        }
        return replyPages.pages.flatMap(x => x.rows);
    }, [replyPages]);

    return (
        <LoadMoreScroller fetching={fetchingReplies} hasNextPage={hasMoreReplies ?? false} onFetchNextPage={fetchNextReplies} fetchNextPageLabel="Show more replies">
            {
                replies.map(c => <Comment {...c} />)
            }
        </LoadMoreScroller>
    )
}

export { ReplyList }