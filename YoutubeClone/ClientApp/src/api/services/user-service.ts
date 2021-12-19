import { ChannelSummary, CreateChannelRequest, CreateSubscriptionRequest, CreateUserRequest, SubscriptionSummary, UpdateUserRequest, UserSummary, VideoSummary, Page } from "../models";
import { getHeaders } from "../get-headers";

async function createUser(token: string, body: CreateUserRequest): Promise<UserSummary> {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getUsers(
    token: string,
    filterBy?: string,
    filter?: string,
    orderBy?: string,
    orderDir?: string,
    continuationToken?: string,
    take: number = 100): Promise<Page<UserSummary>> {
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

async function updateUser(token: string, userId: string, body: UpdateUserRequest): Promise<UserSummary> {
    const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function createChannel(token: string, userId: string, body: CreateChannelRequest): Promise<ChannelSummary> {
    const response = await fetch(`/api/user/${userId}/channels`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function createSubscription(token: string, userId: string, body: CreateSubscriptionRequest): Promise<SubscriptionSummary> {
    const response = await fetch(`/api/user/${userId}/subscriptions`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getFeed(token: string, userId: string, continuationToken?: string, take: number = 100): Promise<Page<VideoSummary>> {
    const url = `/api/user/${userId}/feed?`;

    const searchParams = new URLSearchParams();

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

async function getUserSubscriptions(token: string, userId: string, continuationToken?: string, take: number = 100): Promise<Page<SubscriptionSummary>> {
    const url = `api/user/${userId}/subscriptions?`;

    const searchParams = new URLSearchParams();

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

async function getUserChannels(token: string, userId: string, continuationToken?: string, take: number = 100): Promise<Page<ChannelSummary>> {
    const url = `api/user/${userId}/channels?`;

    const searchParams = new URLSearchParams();

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

export { createUser, getUsers, updateUser, createChannel, createSubscription, getFeed, getUserSubscriptions, getUserChannels }