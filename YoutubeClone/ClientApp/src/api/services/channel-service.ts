import { ChannelSummary, CreateVideoRequest, VideoSummary, mapJsonToVideoSummary, Page, mapJsonToChannelSummary } from "../models";
import { getHeaders } from "../get-headers";

interface CreateChannelVideoQuery {
    token: string;
    channelId: string;
    body: CreateVideoRequest
}

async function createChannelVideo(query: CreateChannelVideoQuery): Promise<VideoSummary> {
    const { token, channelId, body } = query;

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

interface GetChannelsQuery {
    token: string;
    filterBy?: string;
    filter?: string;
    orderBy?: string;
    orderDir?: string;
    continueToken?: string;
    take?: number;
}


async function getChannels(query: GetChannelsQuery): Promise<Page<ChannelSummary>> {
    const {
        token,
        filterBy,
        filter,
        orderBy,
        orderDir,
        continueToken,
        take
    } = query;

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
        rows: json.rows.map(mapJsonToChannelSummary)
    }
}

interface GetChannelVideosQuery {
    token: string;
    channelId: string;
    filterBy?: string;
    filter?: string;
    orderBy?: string;
    orderDir?: string;
    continueToken?: string;
    take?: number;
}

async function getChannelVideos(query: GetChannelVideosQuery): Promise<Page<VideoSummary>> {
    const {
        token,
        channelId,
        filterBy,
        filter,
        orderBy,
        orderDir,
        continueToken,
        take
    } = query;

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
        rows: json.rows.map(mapJsonToVideoSummary)
    }
}

interface DeleteChannelQuery {
    token: string;
    channelId: string;
}

async function deleteChannel(query: DeleteChannelQuery): Promise<void> {
    const { token, channelId } = query;
    await fetch(`/api/channel/${channelId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
}

export { createChannelVideo, getChannels, getChannelVideos, deleteChannel }