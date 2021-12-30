import * as React from 'react';
import { useReducer, useEffect, useCallback } from 'react';
import { Box, Hidden } from "@mui/material";
import { VideoSummary, SubscriptionSummary, UserSummary } from '../api/models';
import { getFeed, getUserSubscriptions } from '../api/services/user-service';
import { getVideos } from '../api/services/video-service';
import { getVideoSuggestions } from '../api/services/video-suggestions';
import { useDebounce } from '../hooks/use-debounce';
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';
import HamburgerButton from './hamburger-button';
import Logo from './logo';
import SearchField from './search-field';
import UploadVideoButton from './upload-video-button';
import AccountMenuButton from './account-menu-button';
import LoginButton from './login-button';
import UploadVideoDialog from './upload-video-dialog';

interface HomePageState {
    searchText: string;
    searchSuggestions: string[];
    feed: VideoSummary[];
    fetchFeedContinueToken?: string | null;
    fetchFeed: boolean;
    fetchFeedError: string;
    subscriptions: SubscriptionSummary[];
    fetchSubscriptionsContinueToken?: string | null;
    fetchSubscriptions: boolean;
    fetchSubscriptionsError: string;
    filters: string[];
    isDrawerOpen: boolean;
    isUploadDialogOpen: boolean;
}

enum HomePageActionType {
    OpenDrawer,
    CloseDrawer,
    OpenUploadDialog,
    CloseUploadDialog,
    ClearSubscriptions,
    FetchSubscriptions,
    FetchSubscriptionsSuccess,
    FetchSubscriptionsFailure,
    ClearFeed,
    FetchFeed,
    FetchFeedSuccess,
    FetchFeedFailure,
    SearchTextChanged,
    SearchSuggestionsReceived
}

interface HomePageAction {
    type: HomePageActionType;
    payload?: any;
}

const initialState: HomePageState = {
    searchText: '',
    searchSuggestions: [],
    feed: [],
    fetchFeed: false,
    fetchFeedError: '',
    subscriptions: [],
    fetchSubscriptions: false,
    fetchSubscriptionsError: '',
    filters: [],
    isDrawerOpen: false,
    isUploadDialogOpen: false
}

const reducer = (state: HomePageState, action: HomePageAction): HomePageState => {
    switch (action.type) {
        case HomePageActionType.OpenDrawer:
            return {
                ...state,
                isDrawerOpen: true
            }
        case HomePageActionType.CloseDrawer:
            return {
                ...state,
                isDrawerOpen: false
            }
        case HomePageActionType.OpenUploadDialog:
            return {
                ...state,
                isUploadDialogOpen: true
            }
        case HomePageActionType.CloseUploadDialog:
            return {
                ...state,
                isUploadDialogOpen: false
            }
        case HomePageActionType.ClearSubscriptions:
            return {
                ...state,
                subscriptions: []
            }
        case HomePageActionType.FetchSubscriptions:
            return {
                ...state,
                fetchSubscriptions: true,
                fetchSubscriptionsError: '',
            }
        case HomePageActionType.FetchSubscriptionsSuccess:
            return {
                ...state,
                subscriptions: state.subscriptions.concat(action.payload.rows),
                fetchSubscriptionsContinueToken: action.payload.continuationToken,
                fetchSubscriptions: false
            }
        case HomePageActionType.FetchSubscriptionsFailure:
            return {
                ...state,
                fetchSubscriptions: false,
                fetchSubscriptionsError: action.payload
            }
        case HomePageActionType.ClearFeed:
            return {
                ...state,
                feed: []
            }
        case HomePageActionType.FetchFeed:
            return {
                ...state,
                fetchFeed: true,
                fetchFeedError: ''
            }
        case HomePageActionType.FetchFeedSuccess:
            return {
                ...state,
                feed: state.feed.concat(action.payload.rows),
                fetchFeedContinueToken: action.payload.continuationToken,
                fetchFeed: false
            }
        case HomePageActionType.FetchFeedFailure:
            return {
                ...state,
                fetchFeed: false,
                fetchFeedError: action.payload
            }
        case HomePageActionType.SearchTextChanged:
            return {
                ...state,
                searchText: action.payload
            }
        case HomePageActionType.SearchSuggestionsReceived:
            return {
                ...state,
                searchSuggestions: action.payload
            }
        default:
            return state;
    }
}

interface HomePageProps {
    user?: UserSummary;
    token?: string;
    onClickLogout?: () => void;
}

const HomePage = (props: HomePageProps) => {
    const { user, token, onClickLogout } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        searchText,
        searchSuggestions,
        feed,
        fetchFeed,
        fetchFeedContinueToken,
        subscriptions,
        filters,
        isDrawerOpen,
        isUploadDialogOpen
    } = state;
    const debouncedSearchText = useDebounce(searchText, 500);

    const handleCloseDrawer = useCallback(() => {
        dispatch({ type: HomePageActionType.CloseDrawer });
    }, []);

    const handleOpenDrawer = useCallback(() => {
        dispatch({ type: HomePageActionType.OpenDrawer });
    }, []);

    const handleSearchTextChanged = useCallback((text: string) => {
        dispatch({ type: HomePageActionType.SearchTextChanged, payload: text })
    }, []);

    const handleReceiveSuggestions = useCallback((suggestions: string[]) => {
        dispatch({ type: HomePageActionType.SearchSuggestionsReceived, payload: suggestions })
    }, []);

    const handleClickSearch = useCallback(async (searchText) => {
        try {
            const page = await getVideos('Name', searchText);
            dispatch({ type: HomePageActionType.FetchFeedSuccess, payload: page });
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleOpenUploadVideoDialog = useCallback(() => {
        dispatch({ type: HomePageActionType.OpenUploadDialog });
    }, []);

    const handleCloseUploadVideoDialog = useCallback((success: boolean) => {
        dispatch({ type: HomePageActionType.CloseUploadDialog });
    }, []);

    const fetchFeedItems = useCallback(async (continueToken?: string | null) => {
        if (token && user && continueToken !== null) {
            try {
                dispatch({ type: HomePageActionType.FetchFeed });
                const page = await getFeed(token, user.id, continueToken);
                dispatch({ type: HomePageActionType.FetchFeedSuccess, payload: page });
            } catch (e) {
                dispatch({ type: HomePageActionType.FetchFeedFailure, payload: e });
            }
        }
    }, [token, user]);

    const fetchSubscriptions = useCallback(async (continueToken?: string | null) => {
        if (token && user && continueToken !== null) {
            try {
                dispatch({ type: HomePageActionType.FetchSubscriptions });
                const page = await getUserSubscriptions(token, user.id, continueToken);
                dispatch({ type: HomePageActionType.FetchSubscriptionsSuccess, payload: page });
            } catch (e) {
                dispatch({ type: HomePageActionType.FetchSubscriptionsFailure });
            }
        }
    }, [token, user]);

    const clearFeedItems = useCallback(() => dispatch({ type: HomePageActionType.ClearFeed }), []);
    const clearSubscriptions = useCallback(() => dispatch({ type: HomePageActionType.ClearSubscriptions }), []);

    useEffect(() => {
        if (token && user) {
            fetchSubscriptions();
            fetchFeedItems();
        } else {
            clearSubscriptions();
            clearFeedItems();
        }
    }, [token, user, fetchFeedItems, fetchSubscriptions, clearSubscriptions, clearFeedItems]);

    useEffect(() => {
        if (debouncedSearchText.length > 0) {
            getVideoSuggestions(debouncedSearchText, 10).then(handleReceiveSuggestions);
        } else {
            handleReceiveSuggestions([]);
        }
    }, [debouncedSearchText, handleReceiveSuggestions]);

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Header
                left={
                    <>
                        <HamburgerButton onClick={handleOpenDrawer} />
                        <Hidden mdDown>
                            <Logo />
                        </Hidden>
                    </>
                }
                middle={
                    <SearchField value={searchText} onChange={handleSearchTextChanged} options={searchSuggestions} onSearch={handleClickSearch} />
                }
                right={
                    user ?
                        <>
                            <UploadVideoButton onClick={handleOpenUploadVideoDialog} />
                            <AccountMenuButton onClickLogout={onClickLogout} />
                        </>
                        :
                        <LoginButton />
                } />
            <Box display="flex" flexDirection="row" height="calc(100% - 56px)">
                <AppDrawer open={isDrawerOpen} subscriptions={subscriptions} onClose={handleCloseDrawer} />
                <Box display="flex">
                    <FeedFilterChipBar filters={filters} />
                    <Feed items={feed} fetching={fetchFeed} onFetchNextPage={() => fetchFeedItems(fetchFeedContinueToken)}  />
                </Box>
            </Box>
            <UploadVideoDialog token={token!} user={user!} open={isUploadDialogOpen} onClose={handleCloseUploadVideoDialog} />
        </Box>
    )
};

export default HomePage;
