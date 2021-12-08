namespace YoutubeClone.Domain
{
    public class Subscription
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid UserId { get; private set; }
        public Guid ChannelId { get; private set; }

        public Subscription(Guid userId, Guid channelId)
        {
            UserId = userId;
            ChannelId = channelId;
        }
    }
}
