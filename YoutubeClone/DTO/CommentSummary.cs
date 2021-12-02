namespace YoutubeClone.DTO
{
    public class CommentSummary
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Text { get; set; } = string.Empty;
        public long Likes { get; set; }
        public long Dislikes { get; set; }
        public DateTime Created { get; set; }
    }
}