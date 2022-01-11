import { getHeaders } from "../get-headers";

interface GetVideoSuggestionsQuery {
    prefix?: string;
    take?: number;
}

async function getVideoSuggestions(query: GetVideoSuggestionsQuery): Promise<string[]> {
    const { prefix, take } = query;

    const url = `/api/video-suggestions?`;

    const searchParams = new URLSearchParams();

    if (prefix) {
        searchParams.append('prefix', prefix);
    }

    if (take) {
        searchParams.append('take', take.toString());
    }

    const response = await fetch(url + searchParams, {
        method: 'GET',
        headers: getHeaders()
    });

    return await response.json();
}

export { getVideoSuggestions }
