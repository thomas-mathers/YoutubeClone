namespace YoutubeClone.DTO
{
    public class FeedItemSummary
    {
        public Guid VideoId { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public string ChannelName { get; set; }
        public string ChannelThumbnailUrl { get; set; }
        public int Views { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
