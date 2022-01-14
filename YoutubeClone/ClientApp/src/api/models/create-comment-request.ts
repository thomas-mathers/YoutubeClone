export default interface CreateCommentRequest {
    userId: string;
    videoId: string;
    parentCommentId?: string;
    text: string;
}