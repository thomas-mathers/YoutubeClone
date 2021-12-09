namespace YoutubeClone.DTO
{
    public class UpdateUserRequest
    {
        public string GivenName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string ProfilePictureUrl { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}