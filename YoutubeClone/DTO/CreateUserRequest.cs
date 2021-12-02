using System.ComponentModel.DataAnnotations;

namespace YoutubeClone.DTO
{
    public class CreateUserRequest
    {
        [Required]
        [MinLength(1)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [MinLength(1)]
        public string Password { get; set; } = string.Empty;
        public string GivenName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string ProfilePictureUrl { get;  set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}