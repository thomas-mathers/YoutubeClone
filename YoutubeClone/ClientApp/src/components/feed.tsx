import { useInfiniteQuery } from "react-query";
import { getFeed } from "../api/services/feed-service";
import { getUserFeed } from "../api/services/user-service";
import { useAuthService } from "../hooks/use-auth-service";
import FeedItem from "./feed-item";
import InfiniteScroller from './infinite-scroller';

const Feed = () => {
    const { user, token } = useAuthService();

    const {
        data,
        isFetching,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery(
        ['feed-items', token, user?.id],
        ({ pageParam = undefined }) => {
            if (token && user) {
                return getUserFeed({ token: token, userId: user.id, continueToken: pageParam, take: 6 });
            } else {
                return getFeed({ continueToken: pageParam });
            }
        },
        {
            getNextPageParam: (lastPage,) => lastPage.continueToken ?? undefined
        })

    return (
        <InfiniteScroller fetching={isFetching} hasNextPage={hasNextPage ?? false} onFetchNextPage={fetchNextPage} xs={12} sm={6} md={4} lg={3} xl={2}>
            {
                data?.pages.flatMap(x => x.rows).map((v, i) => (
                    <FeedItem
                        key={v.id}
                        id={v.id}
                        index={i}
                        thumbnailUrl={v.thumbnailUrl}
                        title={v.title}
                        channelThumbnailUrl={v.channelThumbnailUrl}
                        channelName={v.channelName}
                        views={v.views}
                        dateCreated={v.dateCreated} />
                ))
            }
        </InfiniteScroller>
    );
}

export default Feed;