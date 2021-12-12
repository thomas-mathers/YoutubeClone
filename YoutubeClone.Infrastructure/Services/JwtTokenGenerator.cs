using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using YoutubeClone.Domain;

namespace YoutubeClone.Infrastructure.Services
{
    public class JwtTokenGenerator : ITokenGenerator
    {
        private readonly SigningCredentials signingCredentials;
        private readonly string issuer;
        private readonly string audience;
        private readonly long lifeSpanInDays;

        public JwtTokenGenerator(IOptions<JwtTokenGeneratorSettings> options)
        {
            var settings = options.Value;
            signingCredentials = GetSigningCredentials(settings);
            issuer = settings.Issuer;
            audience = settings.Audience;
            lifeSpanInDays = settings.LifespanInDays;
        }

        public string Generate(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,
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

        private static SigningCredentials GetSigningCredentials(JwtTokenGeneratorSettings settings)
        {
            var keyBytes = Encoding.ASCII.GetBytes(settings.Key);
            var key = new SymmetricSecurityKey(keyBytes);

            return new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
        }
    }
}
