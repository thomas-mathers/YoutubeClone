using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.DTO
{
    public class CreateVideoRequest
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; } = string.Empty;
        [Required]
        public IFormFile File { get; set; } = null!;
    }
}