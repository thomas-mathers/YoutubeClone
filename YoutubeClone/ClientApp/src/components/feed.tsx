import { VideoSummary } from "../api/models";
import FeedItem from "./feed-item";
import InfiniteScroller from './infinite-scroller';

interface FeedProps {
    items: VideoSummary[];
    fetching: boolean;
    onFetch: () => void;
}

const Feed = (props: FeedProps) => {
    const { items, fetching, onFetch } = props;

    return (
        <InfiniteScroller fetching={fetching} onFetchNextPage={onFetch}>
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