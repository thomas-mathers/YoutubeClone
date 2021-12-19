export default interface CreateVideoRequest {
    title: string;
    description: string;
    videoFile: File;
    thumbnailFile: File;
}