namespace YoutubeClone.DTO
{
    public class LoginResponse
    {
        public UserSummary User { get; }
        public string Token { get; } = string.Empty;

        public LoginResponse(UserSummary userSummary, string token)
        {
            User = userSummary;
            Token = token;
        }
    }
}
