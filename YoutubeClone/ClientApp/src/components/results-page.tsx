import * as React from 'react';
import { useReducer, useCallback } from 'react';
import { Box } from "@mui/material";
import AppDrawer from "./app-drawer";
import Feed from "./feed";
import Header from './header';

interface ResultsPageState {
    isDrawerOpen: boolean;
}

enum ResultsPageActionType {
    OpenDrawer,
    CloseDrawer
}

interface ResultsPageAction {
    type: ResultsPageActionType;
    payload?: any;
}

const initialState: ResultsPageState = {
    isDrawerOpen: false
}

const reducer = (state: ResultsPageState, action: ResultsPageAction): ResultsPageState => {
    switch (action.type) {
        case ResultsPageActionType.OpenDrawer:
            return {
                ...state,
                isDrawerOpen: true
            }
        case ResultsPageActionType.CloseDrawer:
            return {
                ...state,
                isDrawerOpen: false
            }
        default:
            return state;
    }
}

interface ResultsPageProps { }

const ResultsPage = (props: ResultsPageProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isDrawerOpen } = state;

    const handleCloseDrawer = useCallback(() => {
        dispatch({ type: ResultsPageActionType.CloseDrawer });
    }, []);

    const handleOpenDrawer = useCallback(() => {
        dispatch({ type: ResultsPageActionType.OpenDrawer });
    }, []);

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Header onOpenDrawer={handleOpenDrawer} />
            <Box display="flex" flexDirection="row" height="calc(100% - 56px)">
                <AppDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
                <Box display="flex">
                </Box>
            </Box>
        </Box>
    )
};

export default ResultsPage;
