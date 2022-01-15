import { CommentSummary, CreateCommentRequest, mapJsonToCommentSummary, Page } from "../models";
import { getHeaders } from "../get-headers";

interface CreateCommentQuery {
    token: string;
    body: CreateCommentRequest;
}

async function createComment(query: CreateCommentQuery): Promise<CommentSummary> {
    const { token, body } = query;

    const response = await fetch(`/api/comment`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });

    const json = await response.json();

    return mapJsonToCommentSummary(json);
}

interface GetCommentsQuery {
    token: string;
    filterBy?: string;
    filter?: string;
    orderBy?: string;
    orderDir?: string;
    continueToken?: string;
    take?: number;
}

async function getComments(query: GetCommentsQuery): Promise<Page<CommentSummary>> {
    const {
        token,
        filterBy,
        filter,
        orderBy,
        orderDir,
        continueToken,
        take
    } = query;

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

    if (continueToken) {
        searchParams.append('continueToken', continueToken);
    }

    if (take) {
        searchParams.append('take', take.toString());
    }

    const response = await fetch(url + searchParams, {
        method: 'GET',
        headers: getHeaders(token)
    });

    const json = await response.json();

    return {
        continueToken: json.continueToken,
        rows: json.rows.map(mapJsonToCommentSummary)
    }
}

interface GetRepliesQuery {
    commentId: string;
    continueToken?: string;
    take?: number;
}

async function getReplies(query: GetRepliesQuery): Promise<Page<CommentSummary>> {
    const { commentId, continueToken, take } = query;

    const url = `/api/comment/${commentId}/replies?`;

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
        rows: json.rows.map(mapJsonToCommentSummary)
    }
}

export { createComment, getComments, getReplies }