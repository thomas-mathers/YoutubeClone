import { SubscriptionSummary, Page, mapJsonToSubscriptionSummary } from "../models";
import { getHeaders } from "../get-headers";

async function getSubscriptions(
    token: string,
    orderBy?: string,
    orderDir?: string,
    continueToken?: string,
    take: number = 100): Promise<Page<SubscriptionSummary>> {
    const url = '/api/subscription?';

    const searchParams = new URLSearchParams();

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
        rows: json.rows.map(mapJsonToSubscriptionSummary)
    }
}

async function deleteSubscription(token: string, subscriptionId: string): Promise<void> {
    const response = await fetch(`/api/subscription/${subscriptionId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });

    return await response.json();
}

export { getSubscriptions, deleteSubscription }