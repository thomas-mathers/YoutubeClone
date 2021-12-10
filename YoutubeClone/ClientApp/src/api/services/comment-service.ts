import { CommentSummary, CreateReplyRequest } from "../models";
import { getHeaders } from "../get-headers";

async function createReply(token: string, commentId: string, body: CreateReplyRequest): Promise<CommentSummary> {
    const response = await fetch(`/api/comment/${commentId}/replies`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getComments(token: string, channelId: string): Promise<CommentSummary[]> {
    const response = await fetch(`/api/comment/${channelId}`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

export { createReply, getComments }