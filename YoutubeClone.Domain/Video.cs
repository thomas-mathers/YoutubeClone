namespace YoutubeClone.Domain
{
    public class Video
    {
        private readonly HashSet<Comment> comments = new();

        public Guid Id { get; private set; }
        public Guid ChannelId { get; private set; }
        public Channel Channel { get; private set; } = null!;
        public string Name { get; private set; }
        public string Description { get; set; } = string.Empty;
        public string Url { get; private set; }
        public string ThumbnailUrl { get; private set; }
        public long Views { get; private set; }
        public long Likes { get; private set; }
        public long Dislikes { get; private set; }
        public DateTime DateCreated { get; private set; } = DateTime.UtcNow;
        public IEnumerable<Comment> Comments => comments;

        public Video(Guid id, Guid channelId, string name, string url, string thumbnailUrl)
        {
            Id = id;
            ChannelId = channelId;
            Name = name;    
            Url = url;
            ThumbnailUrl = thumbnailUrl;
        }

        public void View()
        {
            Views++;
        }

        public void Like()
        {
            Likes++;
        }

        public void Dislike()
        {
            Dislikes++;
        }

        public void AddComment(Comment comment)
        {
            comments.Add(comment);
        }
    }
}