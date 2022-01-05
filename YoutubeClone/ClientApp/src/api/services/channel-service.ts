import { ChannelSummary, CreateVideoRequest, VideoSummary, mapJsonToVideoSummary, Page, mapJsonToChannelSummary } from "../models";
import { getHeaders } from "../get-headers";

async function createChannelVideo(token: string, channelId: string, body: CreateVideoRequest): Promise<VideoSummary> {
    const formData = new FormData();

    formData.set('title', body.title);
    formData.set('description', body.description);
    formData.set('videoFile', body.videoFile);
    formData.set('thumbnailFile', body.thumbnailFile);

    const response = await fetch(`/api/channel/${channelId}/videos`, {
        method: 'POST',
        headers: getHeaders(token, null),
        body: formData
    });

    const json = await response.json();

    return mapJsonToVideoSummary(json);
}

async function getChannels(
    token: string,
    filterBy?: string,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continueToken?: string,
    take: number = 100): Promise<Page<ChannelSummary>> {
    const url = '/api/channel?';

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

    searchParams.append('take', take.toString());

    const response = await fetch(url + searchParams, {
        method: 'GET',
        headers: getHeaders(token)
    });

    const json = await response.json();

    return {
        continueToken: json.continueToken,
        totalRows: json.totalRows,
        rows: json.rows.map(mapJsonToChannelSummary)
    }
}

async function getChannelVideos(
    token: string,
    channelId: string,
    filterBy?: string,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continueToken?: string,
    take: number = 100): Promise<Page<VideoSummary>> {
    const url = `/api/channel/${channelId}/videos?`;

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

    searchParams.append('take', take.toString());

    const response = await fetch(url + searchParams, {
        method: 'GET',
        headers: getHeaders(token)
    });

    const json = await response.json();

    return {
        continueToken: json.continueToken,
        totalRows: json.totalRows,
        rows: json.rows.map(mapJsonToVideoSummary)
    }
}

async function deleteChannel(token: string, channelId: string): Promise<void> {
    await fetch(`/api/channel/${channelId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
}

export { createChannelVideo, getChannels, getChannelVideos, deleteChannel }