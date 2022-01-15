import { ChannelSummary, CreateChannelRequest, CreateSubscriptionRequest, CreateUserRequest, SubscriptionSummary, UpdateUserRequest, UserSummary, VideoSummary, Page, mapJsonToUserSummary, mapJsonToChannelSummary, mapJsonToSubscriptionSummary, mapJsonToVideoSummary } from "../models";
import { getHeaders } from "../get-headers";

interface CreateUserQuery {
    token: string,
    body: CreateUserRequest;
}

async function createUser(query: CreateUserQuery): Promise<UserSummary> {
    const { token, body } = query;

    const response = await fetch('/api/user', {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });

    const json = await response.json();

    return mapJsonToUserSummary(json);
}

interface GetUsersQuery {
    token: string;
    filterBy?: string;
    filter?: string;
    orderBy?: string;
    orderDir?: string;
    continueToken?: string;
    take?: number;
}

async function getUsers(query: GetUsersQuery): Promise<Page<UserSummary>> {
    const {
        token,
        filterBy,
        filter,
        orderBy,
        orderDir,
        continueToken,
        take
    } = query;

    const url = '/api/user?';

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
        rows: json.rows.map(mapJsonToUserSummary)
    }
}

interface UpdateUserQuery {
    token: string;
    userId: string;
    body: UpdateUserRequest
}

async function updateUser(query: UpdateUserQuery): Promise<UserSummary> {
    const { token, userId, body } = query;

    const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });

    const json = await response.json();

    return mapJsonToUserSummary(json);
}

interface CreateChannelQuery {
    token: string;
    userId: string;
    body: CreateChannelRequest;
}

async function createChannel(query: CreateChannelQuery): Promise<ChannelSummary> {
    const { token, userId, body } = query;

    const response = await fetch(`/api/user/${userId}/channels`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });

    const json = await response.json();

    return mapJsonToChannelSummary(json);
}

interface CreateSubscriptionQuery {
    token: string;
    userId: string;
    body: CreateSubscriptionRequest;
}

async function createSubscription(query: CreateSubscriptionQuery): Promise<SubscriptionSummary> {
    const { token, userId, body } = query;

    const response = await fetch(`/api/user/${userId}/subscriptions`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });

    const json = await response.json();

    return mapJsonToSubscriptionSummary(json);
}

interface GetUserFeedQuery {
    token: string;
    userId: string;
    continueToken?: string;
    take?: number;
}

async function getUserFeed(query: GetUserFeedQuery): Promise<Page<VideoSummary>> {
    const { token, userId, continueToken, take } = query;

    const url = `/api/user/${userId}/feed?`;

    const searchParams = new URLSearchParams();

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

interface GetUserSubscriptionsQuery {
    token: string;
    userId: string;
    continueToken?: string;
    take?: number;
}

async function getUserSubscriptions(query: GetUserSubscriptionsQuery): Promise<Page<SubscriptionSummary>> {
    const { token, userId, continueToken, take } = query;

    const url = `/api/user/${userId}/subscriptions?`;

    const searchParams = new URLSearchParams();

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
        rows: json.rows.map(mapJsonToSubscriptionSummary)
    }
}

interface GetUserChannelsQuery {
    token: string;
    userId: string;
    continueToken?: string;
    take?: number;
}

async function getUserChannels(query: GetUserChannelsQuery): Promise<Page<ChannelSummary>> {
    const { token, userId, continueToken, take } = query;

    const url = `/api/user/${userId}/channels?`;

    const searchParams = new URLSearchParams();

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

export { createUser, getUsers, updateUser, createChannel, createSubscription, getUserFeed, getUserSubscriptions, getUserChannels }