import * as React from 'react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { Box } from "@mui/material";
import { getVideos } from '../api/services/video-service';
import Header from './header';
import ResultsList from './results-list';

const ResultsPage = () => {
    const [searchParams,] = useSearchParams();

    const filter = useMemo(() => searchParams.get('search_query') ?? undefined, [searchParams]);

    const {
        data: resultsPages,
        isFetching: fetching,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery(
        ['results', filter],
        ({ pageParam = undefined }) => getVideos({ filter: filter, continueToken: pageParam }),
        {
            getNextPageParam: (lastPage,) => lastPage.continueToken ?? undefined
        });

    const results = useMemo(() => {
        if (!resultsPages) {
            return [];
        }
        return resultsPages.pages.flatMap(x => x.rows);
    }, [resultsPages]);

    return (
        <Box>
            <Header/>
            <Box padding={2}>
                <ResultsList results={results} fetching={fetching} hasNextPage={hasNextPage ?? false} onFetchNextPage={fetchNextPage} />
            </Box>
        </Box>
    )
};

export default ResultsPage;
