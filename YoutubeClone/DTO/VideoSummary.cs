namespace YoutubeClone.DTO
{
    public class VideoSummary
    {
        public Guid Id { get; set; }
        public Guid ChannelId { get; set; }
        public string ChannelName { get; set; } = string.Empty;
        public string ChannelThumbnailUrl { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public long Views { get; set; }
        public long Likes { get; set; }
        public long Dislikes { get; set; }
        public DateTime DateCreated { get; set; }
    }
}