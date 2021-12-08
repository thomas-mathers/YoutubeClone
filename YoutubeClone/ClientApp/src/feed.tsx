import * as React from 'react';
import CssGrid from "./css-grid";
import FeedItem from "./feed-item";
import FeedItemSummary from "./feed-item-summary";

interface FeedProps {
    items: FeedItemSummary[];
}

const Feed = (props: FeedProps) => {
    const { items } = props;
    return (
        <CssGrid minWidth={350} gap={2}>
            {
                items.map(v => <FeedItem key={v.videoId} thumbnailUrl={v.thumbnailUrl} title={v.title} channelThumbnailUrl={v.channelThumbnailUrl} channelName={v.channelName} views={v.views} dateCreated={v.dateCreated} />)}
        </CssGrid>
    );
}

export default Feed;
