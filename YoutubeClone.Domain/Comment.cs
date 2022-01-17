namespace YoutubeClone.Domain
{
    public class Comment
    {
        private readonly HashSet<Comment> replies = new();
        private readonly HashSet<CommentReaction> reactions = new();

        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;
        public Guid VideoId { get; private set; }
        public Video Video { get; private set; } = null!;
        public Guid? ParentCommentId { get; init; }
        public Comment? ParentComment { get; private set; }
        public string Text { get; private set; }
        public DateTime DateCreated { get; private set; } = DateTime.UtcNow;
        public IEnumerable<Comment> Replies => replies;
        public IEnumerable<CommentReaction> Reactions => reactions;

        public Comment(Guid userId, Guid videoId, string text)
        {
            UserId = userId;
            VideoId = videoId;
            Text = text;
        }

        public void Like(Guid userId)
        {
            reactions.Add(new CommentReaction(Id, userId, ReactionType.Like));
        }

        public void Dislike(Guid userId)
        {
            reactions.Add(new CommentReaction(Id, userId, ReactionType.Dislike));
        }

        public void AddReply(Comment comment)
        {
            replies.Add(comment);
        }
    }
}