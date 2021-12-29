import { CommentSummary, CreateReplyRequest, mapJsonToCommentSummary, Page } from "../models";
import { getHeaders } from "../get-headers";

async function createReply(token: string, commentId: string, body: CreateReplyRequest): Promise<CommentSummary> {
    const response = await fetch(`/api/comment/${commentId}/replies`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });

    const json = await response.json();

    return mapJsonToCommentSummary(json);
}

async function getComments(
    token: string,
    filterBy?: string,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continuationToken?: string,
    take: number = 100): Promise<Page<CommentSummary>> {
    const url = `/api/comment?`;

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
        headers: getHeaders(token)
    });

    const json = await response.json();

    return {
        continuationToken: json.continuationToken,
        rows: json.rows.map(mapJsonToCommentSummary)
    }
}

export { createReply, getComments }