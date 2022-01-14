using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.DTO
{
    public class CreateCommentRequest
    {
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Guid VideoId { get; set; }
        public Guid? ParentCommentId { get; set; }
        [Required]
        [MinLength(1)]
        public string Text { get; set; } = string.Empty;
    }
}