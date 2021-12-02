namespace YoutubeClone.Domain
{
    public class Subscription
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public Guid AccountId { get; private set; }
        public Guid ChannelId { get; private set; }

        public Subscription(Guid accountId, Guid channelId)
        {
            AccountId = accountId;
            ChannelId = channelId;
        }
    }
}
