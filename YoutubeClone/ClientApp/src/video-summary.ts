export default interface VideoSummary {
    id: string;
    channelId: string;
    channelName: string;
    channelThumbnailUrl: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    url: string;
    views: number;
    likes: number;
    dislikes: number;
    dateCreated: string;
}