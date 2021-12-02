using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.DTO
{
    public class CreateSubscriptionRequest
    {
        [Required]
        public Guid ChannelId { get; set; }
    }
}