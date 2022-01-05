import { useCallback, useEffect, useReducer } from "react";
import { VideoSummary } from "../api/models";
import { getFeed } from "../api/services/user-service";
import { useAuthService } from "../hooks/use-auth-service";
import FeedItem from "./feed-item";
import InfiniteScroller from './infinite-scroller';

interface FeedState {
    feed: VideoSummary[];
    continueToken?: string | null;
    fetching: boolean;
    fetchFeedError: string;
}

enum FeedActionType {
    ClearFeed,
    FetchFeed,
    FetchFeedSuccess,
    FetchFeedFailure,
}

interface FeedAction {
    type: FeedActionType;
    payload?: any;
}

const initialState: FeedState = {
    feed: [],
    fetching: false,
    fetchFeedError: '',
}

const reducer = (state: FeedState, action: FeedAction): FeedState => {
    switch (action.type) {
        case FeedActionType.ClearFeed:
            return {
                ...state,
                feed: []
            }
        case FeedActionType.FetchFeed:
            return {
                ...state,
                fetching: true,
                fetchFeedError: ''
            }
        case FeedActionType.FetchFeedSuccess:
            return {
                ...state,
                feed: state.feed.concat(action.payload.rows),
                continueToken: action.payload.continuationToken,
                fetching: false
            }
        case FeedActionType.FetchFeedFailure:
            return {
                ...state,
                fetching: false,
                fetchFeedError: action.payload
            }
        default:
            return state;
    }
}

interface FeedProps { }

const Feed = (props: FeedProps) => {
    const { user, token } = useAuthService();

    const [state, dispatch] = useReducer(reducer, initialState);

    const { feed, fetching, continueToken } = state;

    const fetchFeedItems = useCallback(async (continueToken?: string | null) => {
        if (token && user && continueToken !== null) {
            try {
                dispatch({ type: FeedActionType.FetchFeed });
                const page = await getFeed(token, user.id, continueToken, 6);
                dispatch({ type: FeedActionType.FetchFeedSuccess, payload: page });
            } catch (e) {
                dispatch({ type: FeedActionType.FetchFeedFailure, payload: e });
            }
        }
    }, [token, user]);

    const clearFeedItems = useCallback(() => dispatch({ type: FeedActionType.ClearFeed }), []);

    useEffect(() => {
        if (token && user) {
            fetchFeedItems();
        } else {
            clearFeedItems();
        }
    }, [token, user, fetchFeedItems, clearFeedItems]);

    const handleFetchNextPage = useCallback(() => fetchFeedItems(continueToken), [fetchFeedItems, continueToken]);

    return (
        <InfiniteScroller fetching={fetching} onFetchNextPage={handleFetchNextPage} xs={12} sm={6} md={4} lg={3} xl={2}>
            {
                feed.map(v => (
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