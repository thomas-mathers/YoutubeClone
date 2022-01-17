namespace YoutubeClone.Domain
{
    public class CommentReaction
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid CommentId { get; private set; }
        public Comment Comment { get; private set; } = null!;
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;
        public ReactionType ReactionType { get; private set; }
        public DateTime DateCreated { get; private set; } = DateTime.UtcNow;

        public CommentReaction(Guid commentId, Guid userId, ReactionType reactionType)
        {
            CommentId = commentId;
            UserId = userId;
            ReactionType = reactionType;
        }
    }
}
