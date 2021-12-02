using Microsoft.AspNetCore.Identity;
using YoutubeClone.Domain;

namespace YoutubeClone.Infrastructure
{
    public class User : IdentityUser<Guid>
    {
        private readonly HashSet<Channel> channels = new();
        private readonly HashSet<Subscription> subscriptions = new();

        public string GivenName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string? ProfilePictureUrl { get; set; }
        public DateTime Created { get; } = DateTime.UtcNow;
        public IEnumerable<Channel> Channels => channels;
        public IEnumerable<Subscription> Subscriptions => subscriptions;

        public User(string email)
        {
            UserName = email;
            Email = email;
        }

        public void AddChannel(Channel channel)
        {
            channels.Add(channel);
        }

        public void DeleteChannel(Channel channel)
        {
            channels.Remove(channel);
        }

        public void AddSubscription(Subscription subscription)
        {
            subscriptions.Add(subscription);
        }

        public void DeleteSubscription(Subscription subscription)
        {
            subscriptions.Remove(subscription);
        }
    }
}