import { ChannelSummary, CreateChannelRequest, CreateSubscriptionRequest, CreateUserRequest, SubscriptionSummary, UpdateUserRequest, UserSummary } from "../models";
import { getHeaders } from "../get-headers";

async function createUser(token: string, body: CreateUserRequest): Promise<UserSummary> {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function getUsers(token: string): Promise<UserSummary[]> {
    const response = await fetch('/api/user', {
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

async function getFeed(token: string, userId: string) {
    const response = await fetch(`/api/user/${userId}/feed`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

async function getUserSubscriptions(token: string, userId: string): Promise<SubscriptionSummary> {
    const response = await fetch(`/api/user/${userId}/subscriptions`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

export { createUser, getUsers, updateUser, createChannel, createSubscription, getFeed, getUserSubscriptions }