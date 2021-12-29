export interface SubscriptionSummary {
    id: string;
    userId: string;
    userName: string;
    userProfilePictureUrl: string;
    channelId: string;
    channelName: string;
    channelThumbnailUrl: string;
}

export function mapJsonToSubscriptionSummary(json: any): SubscriptionSummary {
    return {
        id: json.id,
        userId: json.userId,
        userName: json.userName,
        userProfilePictureUrl: json.userProfilePictureUrl,
        channelId: json.channelId,
        channelName: json.channelName,
        channelThumbnailUrl: json.channelThumbnailUrl
    }
}