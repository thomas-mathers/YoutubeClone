namespace YoutubeClone.Infrastructure.Services
{
    public interface ITokenGenerator
    {
        string Generate(User user);
    }
}
