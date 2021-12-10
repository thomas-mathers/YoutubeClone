import { SubscriptionSummary } from "../models";
import { getHeaders } from "../get-headers";

async function getSubscriptions(token: string): Promise<SubscriptionSummary[]> {
    const response = await fetch(`/api/subscription`, {
        method: 'GET',
        headers: getHeaders(token)
    });
    return await response.json();
}

async function deleteSubscription(token: string, subscriptionId: string): Promise<void> {
    const response = await fetch(`/api/subscription/${subscriptionId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
    return await response.json();
}

export { getSubscriptions, deleteSubscription }