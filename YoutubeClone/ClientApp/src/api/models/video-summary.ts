export interface VideoSummary {
    id: string;
    channelId: string;
    channelName: string;
    channelThumbnailUrl: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    url: string;
    views: number;
    likes: number;
    dislikes: number;
    dateCreated: Date;
}

export function mapJsonToVideoSummary(json: any): VideoSummary {
    return {
        id: json.id,
        channelId: json.channelId,
        channelName: json.channelName,
        channelThumbnailUrl: json.channelThumbnailUrl,
        title: json.title,
        description: json.description,
        thumbnailUrl: json.thumbnailUrl,
        url: json.url,
        views: json.views,
        likes: json.likes,
        dislikes: json.dislikes,
        dateCreated: new Date(json.dateCreated)
    }
}