﻿import { ChannelSummary, CreateVideoRequest, VideoSummary, Page } from "../models";
import { getHeaders } from "../get-headers";

async function createChannelVideo(token: string, body: CreateVideoRequest): Promise<VideoSummary> {
    const response = await fetch('/api/video', {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getChannels(
    token: string,
    filterBy?: string,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continuationToken?: string,
    take: number = 100): Promise<Page<ChannelSummary>> {
    const url = '/api/channel';

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

    return await response.json();
}

async function getChannelVideos(
    token: string,
    channelId: string,
    filterBy?: string,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continuationToken?: string,
    take: number = 100): Promise<Page<VideoSummary>> {
    const url = `/api/channel/${channelId}/videos`;

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

    return await response.json();
}

async function deleteChannel(token: string, channelId: string): Promise<void> {
    const response = await fetch(`/api/channel/${channelId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
}

export { createChannelVideo, getChannels, getChannelVideos, deleteChannel }