export default interface CommentSummary {
    id: string;
    userId: string;
    userName: string;
    userProfilePictureUrl: string;
    text: string;
    likes: number;
    dislikes: number;
    dateCreated: string;
}