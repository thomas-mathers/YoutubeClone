import { CommentSummary, CreateCommentRequest, VideoSummary, VideoDetail, Page, mapJsonToCommentSummary, mapJsonToVideoDetail, mapJsonToVideoSummary } from "../models";
import { getHeaders } from "../get-headers";

async function createComment(token: string, videoId: string, body: CreateCommentRequest): Promise<CommentSummary> {
    const response = await fetch(`/api/video/${videoId}/comments`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });

    const json = await response.json();

    return mapJsonToCommentSummary(json);
}

async function getVideo(id: string): Promise<VideoDetail> {
    const response = await fetch(`/api/video/${id}`, {
        method: 'GET',
        headers: getHeaders()
    });

    const json = await response.json();

    return mapJsonToVideoDetail(json);
}

async function getVideos(
    filterBy?: string,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continuationToken?: string,
    take: number = 100): Promise<Page<VideoSummary>> {
    const url = `/api/video?`;

    const searchParams = new URLSearchParams();

    if (filterBy) {
        searchParams.append('filterBy', filterBy);
    }

    if (filter) {
        searchParams.append('filter', filter);
    }

    if (orderBy) {
        searchParams.append('orderBy', orderBy);
    }

    if (orderDir) {
        searchParams.append('orderDir', orderDir);
    }

    if (continuationToken) {
        searchParams.append('continuationToken', continuationToken);
    }

    searchParams.append('take', take.toString());

    const response = await fetch(url + searchParams, {
        method: 'GET',
        headers: getHeaders()
    });

    const json = await response.json();

    return {
        continuationToken: json.continuationToken,
        rows: json.rows.map(mapJsonToVideoSummary)
    }
}

async function getVideoComments(id: string): Promise<Page<CommentSummary>> {
    const response = await fetch(`/api/video/${id}/comments`, {
        method: 'GET',
        headers: getHeaders()
    });

    const json = await response.json();

    return {
        continuationToken: json.continuationToken,
        rows: json.rows.map(mapJsonToCommentSummary)
    }
}

async function deleteVideo(token: string, videoId: string): Promise<void> {
    const response = await fetch(`/api/video/${videoId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
    return await response.json();
}

export { createComment, getVideo, getVideos, getVideoComments, deleteVideo }