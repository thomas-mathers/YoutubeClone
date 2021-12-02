using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.DTO
{
    public class CreateChannelRequest
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; } = string.Empty;
    }
}