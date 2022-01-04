import * as React from 'react';
import { useReducer, useCallback } from 'react';
import { Box } from "@mui/material";
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import FeedFilterChipBar from "./feed-filter-chip-bar";
import Header from './header';

interface HomePageState {
    filters: string[];
    isDrawerOpen: boolean;
}

enum HomePageActionType {
    OpenDrawer,
    CloseDrawer
}

interface HomePageAction {
    type: HomePageActionType;
    payload?: any;
}

const initialState: HomePageState = {
    filters: [],
    isDrawerOpen: false
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
        default:
            return state;
    }
}

interface HomePageProps { }

const HomePage = (props: HomePageProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { filters, isDrawerOpen } = state;

    const handleCloseDrawer = useCallback(() => {
        dispatch({ type: HomePageActionType.CloseDrawer });
    }, []);

    const handleOpenDrawer = useCallback(() => {
        dispatch({ type: HomePageActionType.OpenDrawer });
    }, []);

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Header onOpenDrawer={handleOpenDrawer} />
            <Box display="flex" flexDirection="row" height="calc(100% - 56px)">
                <AppDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
                <Box flex={1} padding={2}>
                    <FeedFilterChipBar filters={filters} />
                    <Feed />
                </Box>
            </Box>
        </Box>
    )
};

export default HomePage;
