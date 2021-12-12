import * as React from 'react';
import { Fragment, useReducer, useEffect } from 'react';
import { Box, Stack } from "@mui/material";
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';
import { VideoSummary, UserSummary, SubscriptionSummary } from '../api/models';
import { getUserSubscriptions } from '../api/services/user-service';

interface HomePageState {
    user: UserSummary | null;
    videos: VideoSummary[];
    subscriptions: SubscriptionSummary[];
    filters: string[];
    appDrawerOpen: boolean;
}

enum HomePageActionType {
    UpdateUser,
    OpenDrawer,
    CloseDrawer,
    UpdateSubscriptions
}

interface HomePageAction {
    type: HomePageActionType;
    payload?: any;
}

const initialState: HomePageState = {
    user: null,
    subscriptions: [
        {
            id: '1234567',
            channelId: '12345678',
            channelName: 'Anthony Brian Logan',
            channelThumbnailUrl: '',
            userId: '12345678',
            userName: 'Thomas Mathers',
            userProfilePictureUrl: ''
        },
        {
            id: '123456',
            channelId: '12345678',
            channelName: 'Anthony Brian Logan',
            channelThumbnailUrl: '',
            userId: '12345678',
            userName: 'Thomas Mathers',
            userProfilePictureUrl: ''
        },
        {
            id: '1234',
            channelId: '12345678',
            channelName: 'Anthony Brian Logan',
            channelThumbnailUrl: '',
            userId: '12345678',
            userName: 'Thomas Mathers',
            userProfilePictureUrl: ''
        }
    ],
    videos: [
        {
            id: '123458',
            channelId: '1',
            channelName: 'Thomas Mathers',
            channelThumbnailUrl: '',
            name: 'Thomas Mathers',
            description: '',
            thumbnailUrl: 'https://i.ytimg.com/an_webp/bzMTlBddJ-E/mqdefault_6s.webp?du=3000&sqp=COKpv40G&rs=AOn4CLAuCtxj7RdvpH4PHrdIVOpW-2N0Lg',
            url: '',
            views: 0,
            likes: 0,
            dislikes: 0,
            dateCreated: ''
        }
    ],
    filters: [
        'All',
        'Filter 1',
        'Filter 2',
        'Filter 3',
        'Filter 4',
        'Filter 5',
        'Filter 6',
        'Filter 7',
        'Filter 8',
        'Filter 9',
        'Filter 10',
    ],
    appDrawerOpen: false
}

const reducer = (state: HomePageState, action: HomePageAction) => {
    switch (action.type) {
        case HomePageActionType.UpdateUser:
            return {
                ...state,
                user: action.payload
            }
        case HomePageActionType.OpenDrawer:
            return {
                ...state,
                appDrawerOpen: true
            }
        case HomePageActionType.CloseDrawer:
            return {
                ...state,
                appDrawerOpen: false
            }
        case HomePageActionType.UpdateSubscriptions:
            return {
                ...state,
                subscriptions: action.payload
            }
        default:
            return state;
    }
}

export { reducer }

const HomePage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, subscriptions, videos, filters, appDrawerOpen } = state;

    useEffect(() => {
        getUserSubscriptions('', '46332a2b-70a9-4c7c-7895-08d9b5395b3b').then(s => dispatch({ type: HomePageActionType.UpdateSubscriptions, payload: s }));
    }, []);

    return (
        <Fragment>
            <Header
                user={user}
                openDrawer={() => dispatch({ type: HomePageActionType.OpenDrawer })}/>
            <Box display="flex">
                <AppDrawer open={appDrawerOpen} subscriptions={subscriptions} onClose={() => dispatch({ type: HomePageActionType.CloseDrawer })} />
                <Stack component="main" spacing={2} padding={2} flexGrow={1} overflow="hidden">
                    <FeedFilterChipBar filters={filters} />
                    <Feed items={videos} />
                </Stack>
            </Box>
        </Fragment>
    )
};

export default HomePage;
