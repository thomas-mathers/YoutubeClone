namespace YoutubeClone.DTO
{
    public class UserSummary
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string GivenName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string? ProfilePictureUrl { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime Created { get; set; }
    }
}
