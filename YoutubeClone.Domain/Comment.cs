namespace YoutubeClone.Domain
{
    public class Comment
    {
        private readonly HashSet<Comment> replies = new();

        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;
        public Guid VideoId { get; private set; }
        public Video Video { get; private set; } = null!;
        public string Text { get; private set; }
        public long Likes { get; private set; }
        public long Dislikes { get; private set; }
        public DateTime DateCreated { get; private set; } = DateTime.UtcNow;
        public IEnumerable<Comment> Replies => replies;

        public Comment(Guid userId, Guid videoId, string text)
        {
            UserId = userId;
            VideoId = videoId;
            Text = text;
        }

        public void Like()
        {
            Likes++;
        }

        public void Dislike()
        {
            Dislikes++;
        }

        public void AddReply(Comment comment)
        {
            replies.Add(comment);
        }
    }
}