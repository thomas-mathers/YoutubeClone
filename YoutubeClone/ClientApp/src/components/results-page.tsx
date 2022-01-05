import * as React from 'react';
import { useReducer, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from "@mui/material";
import { VideoSummary } from '../api/models';
import { getVideos } from '../api/services/video-service';
import Header from './header';
import ResultsList from './results-list';

interface ResultsPageState {
    results: VideoSummary[],
    fetching: boolean;
    fetchResultsError: string;
    continueToken?: string | null;
}

enum ResultsPageActionType {
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
    fetchResultsError: ''
}

const reducer = (state: ResultsPageState, action: ResultsPageAction): ResultsPageState => {
    switch (action.type) {
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
                continueToken: action.payload.page.continueToken,
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

    const { results, fetching, continueToken } = state;

    const [searchParams, ] = useSearchParams();

    const fetchPage = useCallback(async (continueToken?: string | null, append: boolean = true) => {
        const filter = searchParams.get('search_query');

        if (filter !== null && continueToken !== null) {
            try {
                dispatch({ type: ResultsPageActionType.FetchResults });
                const page = await getVideos({ filter: filter, continueToken: continueToken });
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

    const handleFetchNextPage = useCallback(() => fetchNextPage(continueToken), [fetchNextPage, continueToken]);

    return (
        <Box>
            <Header/>
            <Box padding={2}>
                <ResultsList results={results} fetching={fetching} onFetchNextPage={handleFetchNextPage} />
            </Box>
        </Box>
    )
};

export default ResultsPage;
