import CssGrid from "./css-grid";
import FeedItem from "./feed-item";

const Feed = () => {
    return (
        <CssGrid xl="1fr 1fr 1fr 1fr" lg="1fr 1fr 1fr" md="1fr 1fr 1fr" sm="1fr 1fr" xs="1fr" gap={2}>
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
