import { VideoSummary } from "../api/models";
import FeedItem from "./feed-item";
import InfiniteScroller from './infinite-scroller';

interface FeedProps {
    items: VideoSummary[];
    fetching: boolean;
    onFetchNextPage: () => void;
}

const Feed = (props: FeedProps) => {
    const { items, fetching, onFetchNextPage } = props;

    return (
        <InfiniteScroller fetching={fetching} onFetchNextPage={onFetchNextPage} xs={12} sm={6} md={4} xl={3}>
            {
                items.map(v => (
                    <FeedItem
                        key={v.id}
                        id={v.id}
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