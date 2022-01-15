export interface VideoDetail {
    id: string;
    channelId: string;
    channelName: string;
    channelThumbnailUrl: string;
    channelSubscriptions: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    url: string;
    views: number;
    likes: number;
    dislikes: number;
    comments: number;
    dateCreated: Date;
}

export function mapJsonToVideoDetail(json: any): VideoDetail {
    return {
        id: json.id,
        channelId: json.channelId,
        channelName: json.channelName,
        channelThumbnailUrl: json.channelThumbnailUrl,
        channelSubscriptions: json.channelSubscriptions,
        title: json.title,
        description: json.description,
        thumbnailUrl: json.thumbnailUrl,
        url: json.url,
        views: json.views,
        likes: json.likes,
        dislikes: json.dislikes,
        comments: json.comments,
        dateCreated: new Date(json.dateCreated)
    }
}