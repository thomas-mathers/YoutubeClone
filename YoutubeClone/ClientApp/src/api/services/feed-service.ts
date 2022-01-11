import { getHeaders } from "../get-headers";
import { mapJsonToVideoSummary, Page, VideoSummary } from "../models";

interface GetFeedQuery {
    continueToken?: string;
    take?: number;
}

async function getFeed(query: GetFeedQuery): Promise<Page<VideoSummary>> {
    const { continueToken, take } = query;

    const url = `/api/feed?`;

    const searchParams = new URLSearchParams();

    if (continueToken) {
        searchParams.append('continueToken', continueToken);
    }

    if (take) {
        searchParams.append('take', take.toString());
    }

    const response = await fetch(url + searchParams, {
        method: 'GET',
        headers: getHeaders()
    });

    const json = await response.json();

    return {
        continueToken: json.continueToken,
        totalRows: json.totalRows,
        rows: json.rows.map(mapJsonToVideoSummary)
    }
}

export { getFeed }