import { CommentSummary, CreateCommentRequest, VideoSummary } from "../models";
import { getHeaders } from "../get-headers";

async function createComment(token: string, videoId: string, body: CreateCommentRequest): Promise<CommentSummary> {
    const response = await fetch(`/api/video/${videoId}/comments`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getVideos(token: string): Promise<VideoSummary[]> {
    const response = await fetch(`/api/video`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

async function deleteVideo(token: string, videoId: string): Promise<void> {
    const response = await fetch(`/api/video/${videoId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
    return await response.json();
}

export { createComment, getVideos, deleteVideo }