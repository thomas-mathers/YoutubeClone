using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.DTO
{
    public class CreateReplyRequest
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        [MinLength(1)]
        public string Text { get; set; } = string.Empty;
    }
}