import { CommentSummary, CreateCommentRequest, VideoSummary, VideoDetail, Page, mapJsonToCommentSummary, mapJsonToVideoDetail, mapJsonToVideoSummary } from "../models";
import { getHeaders } from "../get-headers";

interface CreateCommentQuery {
    token: string;
    videoId: string;
    body: CreateCommentRequest;
}

async function createComment(query: CreateCommentQuery): Promise<CommentSummary> {
    const { token, videoId, body } = query;

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

type VideoFilterColumn = 'Description' | 'Title';

interface GetVideoRequestOptions {
    filterBy?: VideoFilterColumn,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continueToken?: string,
    take?: number
}

async function getVideos(options: GetVideoRequestOptions): Promise<Page<VideoSummary>> {
    const { filterBy, filter, orderBy, orderDir, continueToken, take } = options;

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

interface GetVideoCommentsQuery {
    videoId: string;
    continueToken?: string,
    take?: number
}

async function getVideoComments(query: GetVideoCommentsQuery): Promise<Page<CommentSummary>> {
    const { videoId, continueToken, take } = query;

    const url = `/api/video/${videoId}/comments?`;

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
        rows: json.rows.map(mapJsonToCommentSummary)
    }
}

interface DeleteVideoQuery {
    token: string;
    videoId: string;
}

async function deleteVideo(query: DeleteVideoQuery): Promise<void> {
    const { token, videoId } = query;

    const response = await fetch(`/api/video/${videoId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
    return await response.json();
}

export { createComment, getVideo, getVideos, getVideoComments, deleteVideo }