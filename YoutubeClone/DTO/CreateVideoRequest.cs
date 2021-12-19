using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.DTO
{
    public class CreateVideoRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public IFormFile VideoFile { get; set; } = null!;
        public IFormFile ThumbnailFile { get; set; } = null!;
    }
}