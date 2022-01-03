import * as React from 'react';
import { useReducer, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from "@mui/material";
import { VideoSummary } from '../api/models';
import { getVideos } from '../api/services/video-service';
import AppDrawer from "./app-drawer";
import Header from './header';
import ResultsList from './results-list';

interface ResultsPageState {
    results: VideoSummary[],
    fetching: boolean;
    fetchResultsError: string;
    continueToken?: string | null;
    isDrawerOpen: boolean;
}

enum ResultsPageActionType {
    OpenDrawer,
    CloseDrawer,
    FetchResults,
    FetchResultsSuccess,
    FetchResultsFailure,
    ClearResults
}

interface ResultsPageAction {
    type: ResultsPageActionType;
    payload?: any;
}

const initialState: ResultsPageState = {
    results: [],
    fetching: false,
    fetchResultsError: '',
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
        case ResultsPageActionType.FetchResults:
            return {
                ...state,
                fetching: true,
                fetchResultsError: ''
            }
        case ResultsPageActionType.FetchResultsSuccess:
            return {
                ...state,
                results: action.payload.append ? state.results.concat(action.payload.page.rows) : action.payload.page.rows,
                continueToken: action.payload.page.continuationToken,
                fetching: false
            }
        case ResultsPageActionType.FetchResultsFailure:
            return {
                ...state,
                fetching: false,
                fetchResultsError: action.payload
            }
        default:
            return state;
    }
}

interface ResultsPageProps { }

const ResultsPage = (props: ResultsPageProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { results, fetching, continueToken, isDrawerOpen } = state;

    const [searchParams, ] = useSearchParams();

    const handleCloseDrawer = useCallback(() => {
        dispatch({ type: ResultsPageActionType.CloseDrawer });
    }, []);

    const handleOpenDrawer = useCallback(() => {
        dispatch({ type: ResultsPageActionType.OpenDrawer });
    }, []);

    const fetchPage = useCallback(async (continueToken?: string | null, append: boolean = true) => {
        const filter = searchParams.get('search_query');

        if (filter !== null && continueToken !== null) {
            try {
                dispatch({ type: ResultsPageActionType.FetchResults });
                const page = await getVideos({ filter: filter, continuationToken: continueToken });
                dispatch({ type: ResultsPageActionType.FetchResultsSuccess, payload: { page, append } });
            } catch (e) {
                dispatch({ type: ResultsPageActionType.FetchResultsFailure, payload: e });
            }
        }
    }, [searchParams]);

    const fetchNextPage = useCallback(async (continueToken?: string | null) => {
        fetchPage(continueToken, true);
    }, [fetchPage]);

    const fetchResults = useCallback(async (continueToken?: string | null) => {
        fetchPage(continueToken, false);
    }, [fetchPage]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Header onOpenDrawer={handleOpenDrawer} />
            <Box display="flex" flexDirection="row" height="calc(100% - 56px)">
                <AppDrawer open={isDrawerOpen} onClose={handleCloseDrawer} />
                <Box display="flex">
                    <ResultsList results={results} fetching={fetching} onFetchNextPage={() => fetchNextPage(continueToken)} />
                </Box>
            </Box>
        </Box>
    )
};

export default ResultsPage;
