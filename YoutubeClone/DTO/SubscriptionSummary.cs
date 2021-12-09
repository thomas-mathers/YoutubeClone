namespace YoutubeClone.DTO
{
    public class SubscriptionSummary
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserProfilePictureUrl { get; set; } = string.Empty;
        public Guid ChannelId { get; set; }
        public string ChannelName { get; set; } = string.Empty;
        public string ChannelThumbnailUrl { get; set; } = string.Empty;
    }
}
