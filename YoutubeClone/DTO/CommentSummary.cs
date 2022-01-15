namespace YoutubeClone.DTO
{
    public class CommentSummary
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid VideoId { get; set; }
        public Guid? ParentCommentId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserProfilePictureUrl { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public long Likes { get; set; }
        public long Dislikes { get; set; }
        public long Replies { get; set; }
        public DateTime DateCreated { get; set; }
    }
}