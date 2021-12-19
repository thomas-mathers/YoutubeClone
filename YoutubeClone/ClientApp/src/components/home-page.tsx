import * as React from 'react';
import { useReducer, useEffect, useCallback } from 'react';
import { Box, Hidden, Stack } from "@mui/material";
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
import CreateButton from './create-button';
import AccountMenu from './account-menu';
import LoginButton from './login-button';
import UploadVideoDialog from './upload-video-dialog';

interface HomePageState {
    searchText: string;
    searchSuggestions: string[];
    videos: VideoSummary[];
    subscriptions: SubscriptionSummary[];
    filters: string[];
    isAppDrawerOpen: boolean;
    isUploadVideoDialogOpen: boolean;
}

enum HomePageActionType {
    OpenDrawer,
    CloseDrawer,
    OpenUploadVideoDialog,
    CloseUploadVideoDialog,
    SubscriptionsReceived,
    VideosReceived,
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
    subscriptions: [],
    videos: [],
    filters: [],
    isAppDrawerOpen: false,
    isUploadVideoDialogOpen: false
}

const reducer = (state: HomePageState, action: HomePageAction): HomePageState => {
    switch (action.type) {
        case HomePageActionType.OpenDrawer:
            return {
                ...state,
                isAppDrawerOpen: true
            }
        case HomePageActionType.CloseDrawer:
            return {
                ...state,
                isAppDrawerOpen: false
            }
        case HomePageActionType.OpenUploadVideoDialog:
            return {
                ...state,
                isUploadVideoDialogOpen: true
            }
        case HomePageActionType.CloseUploadVideoDialog:
            return {
                ...state,
                isUploadVideoDialogOpen: false
            }
        case HomePageActionType.SubscriptionsReceived:
            return {
                ...state,
                subscriptions: action.payload
            }
        case HomePageActionType.VideosReceived:
            return {
                ...state,
                videos: action.payload
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
    const { searchText, searchSuggestions, subscriptions, videos, filters, isAppDrawerOpen, isUploadVideoDialogOpen } = state;
    const debouncedSearchText = useDebounce(searchText, 500);

    const handleCloseDrawer = useCallback(() => {
        dispatch({ type: HomePageActionType.CloseDrawer });
    }, []);

    const handleOpenDrawer = useCallback(() => {
        dispatch({ type: HomePageActionType.OpenDrawer });
    }, []);

    const handleReceiveSubscriptions = useCallback((subscriptions: SubscriptionSummary[]) => {
        dispatch({ type: HomePageActionType.SubscriptionsReceived, payload: subscriptions });
    }, []);

    const handleReceiveVideos = useCallback((videos: VideoSummary[]) => {
        dispatch({ type: HomePageActionType.VideosReceived, payload: videos })
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
            handleReceiveVideos(page.rows);
        } catch (e) {
            console.error(e);
        }
    }, [handleReceiveVideos]);

    const handleOpenUploadVideoDialog = useCallback(() => {
        dispatch({ type: HomePageActionType.OpenUploadVideoDialog });
    }, []);

    const handleCloseUploadVideoDialog = useCallback((e: any, reason: any) => {
        if (reason === 'backdropClick') {
            return;
        }

        dispatch({ type: HomePageActionType.CloseUploadVideoDialog });
    }, []);

    useEffect(() => {
        if (token && user) {
            getUserSubscriptions(token, user.id).then(page => page.rows).then(handleReceiveSubscriptions);
            getFeed(token, user.id).then(page => page.rows).then(handleReceiveVideos);
        } else {
            handleReceiveSubscriptions([]);
            handleReceiveVideos([]);
        }
    }, [token, user, handleReceiveSubscriptions, handleReceiveVideos]);

    useEffect(() => {
        if (debouncedSearchText.length > 0) {
            getVideoSuggestions(debouncedSearchText, 10).then(handleReceiveSuggestions);
        } else {
            handleReceiveSuggestions([]);
        }
    }, [debouncedSearchText, handleReceiveSuggestions]);

    return (
        <>
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
                            <CreateButton onClick={handleOpenUploadVideoDialog}/>
                            <AccountMenu onClickLogout={onClickLogout} />
                        </>
                        :
                        <LoginButton />
                }/>
            <Box display="flex">
                <AppDrawer open={isAppDrawerOpen} subscriptions={subscriptions} onClose={handleCloseDrawer} />
                <Stack component="main" spacing={2} padding={2} flexGrow={1} overflow="hidden">
                    <FeedFilterChipBar filters={filters} />
                    <Feed items={videos} />
                </Stack>
            </Box>
            <UploadVideoDialog token={token!} user={user!} open={isUploadVideoDialogOpen} onClose={handleCloseUploadVideoDialog} />
        </>
    )
};

export default HomePage;
