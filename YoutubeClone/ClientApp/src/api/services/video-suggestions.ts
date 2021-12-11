import { getHeaders } from "../get-headers";

async function getVideoSuggestions(prefix: string, take: number): Promise<string[]> {
    const response = await fetch(`/api/video-suggestions?prefix=${prefix}&take=${take}`, {
        method: 'GET',
        headers: getHeaders()
    });
    return await response.json();
}

export { getVideoSuggestions }
