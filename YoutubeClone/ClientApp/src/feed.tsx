import * as React from 'react';
import CssGrid from "./css-grid";
import FeedItem from "./feed-item";

const Feed = () => {
    return (
        <CssGrid minWidth={350} gap={2}>
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
            <FeedItem />
        </CssGrid>
    );
}

export default Feed;
