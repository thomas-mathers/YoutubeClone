export interface ChannelSummary {
    id: string;
    userId: string;
    userName: string;
    userProfilePictureUrl: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    dateCreated: Date;
}

export function mapJsonToChannelSummary(json: any): ChannelSummary {
    return {
        id: json.id,
        userId: json.userId,
        userName: json.userName,
        userProfilePictureUrl: json.userProfilePictureUrl,
        name: json.name,
        description: json.description,
        thumbnailUrl: json.thumbnailUrl,
        dateCreated: new Date(json.dateCreated)
    }
}