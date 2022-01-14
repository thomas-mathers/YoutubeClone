import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { getVideoComments } from "../api/services/video-service";
import InfiniteScroller from "./infinite-scroller";
import Comment from "./comment";

interface CommentListProps {
    videoId: string;
}

const CommentList = (props: CommentListProps) => {
    const { videoId } = props;

    const { data: commentPages, isFetching: fetchingComments, hasNextPage: hasMoreComments, fetchNextPage: fetchMoreComments } = useInfiniteQuery(
        ['comments', videoId],
        ({ pageParam = undefined }) => getVideoComments({ videoId: videoId, continueToken: pageParam }),
        {
            getNextPageParam: (lastPage,) => lastPage.continueToken ?? undefined
        });

    const comments = useMemo(() => {
        if (!commentPages) {
            return [];
        }
        return commentPages.pages.flatMap(x => x.rows);
    }, [commentPages])

    return (
        <InfiniteScroller fetching={fetchingComments} hasNextPage={hasMoreComments ?? false} onFetchNextPage={fetchMoreComments}>
            {
                comments.map(c => <Comment {...c}/>)
            }
        </InfiniteScroller>
    )
}

export default CommentList;