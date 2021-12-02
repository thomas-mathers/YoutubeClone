using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace YoutubeClone.Infrastructure.Services
{
    public class JwtTokenGenerator : ITokenGenerator
    {
        private readonly SigningCredentials signingCredentials;
        private readonly long lifeSpanInDays;

        public JwtTokenGenerator(IOptions<JwtTokenGeneratorSettings> settings)
        {
            var keyBytes = Encoding.ASCII.GetBytes(settings.Value.Key);
            var key = new SymmetricSecurityKey(keyBytes);
            signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            lifeSpanInDays = settings.Value.LifespanInDays;
        }

        public string Generate(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] 
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(lifeSpanInDays),
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
