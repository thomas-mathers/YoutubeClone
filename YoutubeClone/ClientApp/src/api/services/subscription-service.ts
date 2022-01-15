import { SubscriptionSummary, Page, mapJsonToSubscriptionSummary } from "../models";
import { getHeaders } from "../get-headers";

interface GetSubscriptionsQuery {
    token: string;
    orderBy?: string;
    orderDir?: string;
    continueToken?: string;
    take?: number;
}

async function getSubscriptions(query: GetSubscriptionsQuery): Promise<Page<SubscriptionSummary>> {
    const {
        token,
        orderBy,
        orderDir,
        continueToken,
        take
    } = query;

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

interface DeleteSubscriptionQuery {
    token: string;
    subscriptionId: string;
}

async function deleteSubscription(query: DeleteSubscriptionQuery): Promise<void> {
    const { token, subscriptionId } = query;

    const response = await fetch(`/api/subscription/${subscriptionId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });

    return await response.json();
}

export { getSubscriptions, deleteSubscription }