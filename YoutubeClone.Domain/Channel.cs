namespace YoutubeClone.Domain
{
    public class Channel
    {
        private readonly HashSet<Video> videos = new();
        private readonly HashSet<Subscription> subscriptions = new();

        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;
        public string Name { get; private set; }
        public string Description { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public DateTime DateCreated { get; private set; } = DateTime.UtcNow;
        public IEnumerable<Video> Videos => videos;
        public IEnumerable<Subscription> Subscriptions => subscriptions;

        public Channel(Guid userId, string name)
        {
            UserId = userId;
            Name = name;
        }

        public void AddVideo(Video video)
        {
            videos.Add(video);
        }

        public void DeleteVideo(Video video)
        {
            videos.Remove(video);
        }
    }
}
