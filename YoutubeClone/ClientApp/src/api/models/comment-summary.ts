export interface CommentSummary {
    id: string;
    userId: string;
    userName: string;
    userProfilePictureUrl: string;
    text: string;
    likes: number;
    dislikes: number;
    dateCreated: Date;
}

export function mapJsonToCommentSummary(json: any): CommentSummary {
    return {
        id: json.id,
        userId: json.userId,
        userName: json.userName,
        userProfilePictureUrl: json.userProfilePictureUrl,
        text: json.text,
        likes: json.likes,
        dislikes: json.dislikes,
        dateCreated: new Date(json.dateCreated)
    }
}