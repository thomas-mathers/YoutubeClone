import * as React from 'react';
import { Fragment, useReducer, useEffect } from 'react';
import { Box, Stack } from "@mui/material";
import { VideoSummary, SubscriptionSummary, UserSummary } from '../api/models';
import { getUserSubscriptions } from '../api/services/user-service';
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';

interface HomePageState {
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
    subscriptions: [],
    videos: [],
    filters: [],
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

interface HomePageProps {
    user?: UserSummary;
    token?: string;
    onClickLogout?: () => void;
}

const HomePage = (props: HomePageProps) => {
    const { user, token, onClickLogout } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const { subscriptions, videos, filters, appDrawerOpen } = state;

    function updateSubscriptions(subscriptions: SubscriptionSummary[]) {
        dispatch({ type: HomePageActionType.UpdateSubscriptions, payload: subscriptions })
    }

    useEffect(() => {
        if (token && user) {
            getUserSubscriptions(token, user.id).then(updateSubscriptions);
        } else {
            updateSubscriptions([]);
        }
    }, [token, user]);

    return (
        <Fragment>
            <Header user={user} onClickLogout={onClickLogout} onClickDrawer={() => dispatch({ type: HomePageActionType.OpenDrawer })} />
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
