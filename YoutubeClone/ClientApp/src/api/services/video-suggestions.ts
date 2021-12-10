import { getHeaders } from "../get-headers";

async function getVideoSuggestions(token: string, prefix: string): Promise<string[]> {
    const response = await fetch(`/api/video-suggestions`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

export { getVideoSuggestions }
