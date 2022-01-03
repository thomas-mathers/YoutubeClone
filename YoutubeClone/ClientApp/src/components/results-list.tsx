import { VideoSummary } from "../api/models";
import InfiniteScroller from './infinite-scroller';
import Result from "./result";

interface FeedProps {
    results: VideoSummary[];
    fetching: boolean;
    onFetchNextPage: () => void;
}

const ResultsList = (props: FeedProps) => {
    const { results, fetching, onFetchNextPage } = props;
    return (
        <InfiniteScroller fetching={fetching} onFetchNextPage={onFetchNextPage} xs={12}>
            {
                results.map(v => (
                    <Result
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

export default ResultsList;