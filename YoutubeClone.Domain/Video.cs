namespace YoutubeClone.Domain
{
    public class Video
    {
        private readonly HashSet<Comment> comments = new();
        private readonly HashSet<VideoReaction> reactions = new();

        public Guid Id { get; private set; }
        public Guid ChannelId { get; private set; }
        public Channel Channel { get; private set; } = null!;
        public string Title { get; private set; }
        public string Description { get; set; } = string.Empty;
        public string Url { get; private set; }
        public string ThumbnailUrl { get; private set; }
        public long Views { get; private set; }
        public DateTime DateCreated { get; private set; } = DateTime.UtcNow;
        public IEnumerable<Comment> Comments => comments;
        public IEnumerable<VideoReaction> Reactions => reactions;

        public Video(Guid id, Guid channelId, string title, string url, string thumbnailUrl)
        {
            Id = id;
            ChannelId = channelId;
            Title = title;    
            Url = url;
            ThumbnailUrl = thumbnailUrl;
        }

        public void View()
        {
            Views++;
        }

        public void Like(Guid userId)
        {
            reactions.Add(new VideoReaction(Id, userId, ReactionType.Like));
        }

        public void Dislike(Guid userId)
        {
            reactions.Add(new VideoReaction(Id, userId, ReactionType.Dislike));
        }

        public void AddComment(Comment comment)
        {
            comments.Add(comment);
        }
    }
}