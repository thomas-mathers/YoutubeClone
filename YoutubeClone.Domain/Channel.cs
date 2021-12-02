namespace YoutubeClone.Domain
{
    public class Channel
    {
        private readonly HashSet<Video> videos = new();

        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid OwnerId { get; private set; }
        public string Name { get; private set; }
        public string Description { get; init; } = string.Empty;
        public DateTime Created { get; } = DateTime.UtcNow;
        public IEnumerable<Video> Videos => videos;

        public Channel(Guid ownerId, string name)
        {
            OwnerId = ownerId;
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
