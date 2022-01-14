export default interface CreateCommentRequest {
    userId: string;
    parentCommentId?: string;
    text: string;
}