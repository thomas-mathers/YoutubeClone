namespace YoutubeClone.Domain
{
    public class Subscription
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid UserId { get; private set; }
        public User User { get; private set; } = null!;
        public Guid ChannelId { get; private set; }
        public Channel Channel { get; private set; } = null!;

        public Subscription(Guid userId, Guid channelId)
        {
            UserId = userId;
            ChannelId = channelId;
        }
    }
}
