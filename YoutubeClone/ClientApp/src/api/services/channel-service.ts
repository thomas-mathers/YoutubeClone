import { ChannelSummary, CreateVideoRequest, VideoSummary } from "../models";
import { getHeaders } from "../get-headers";

async function createChannelVideo(token: string, body: CreateVideoRequest): Promise<VideoSummary> {
    const response = await fetch('/api/video', {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getChannels(token: string): Promise<ChannelSummary[]> {
    const response = await fetch('/api/channel', {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

async function getChannelVideos(token: string, channelId: string): Promise<VideoSummary[]> {
    const response = await fetch(`/api/channel/${channelId}/videos`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

async function deleteChannel(token: string, channelId: string): Promise<void> {
    const response = await fetch(`/api/channel/${channelId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
}

export { createChannelVideo, getChannels, getChannelVideos, deleteChannel }