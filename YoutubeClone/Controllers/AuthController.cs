using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;
using YoutubeClone.Infrastructure.Services;

namespace YoutubeClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenGenerator userTokenGenerator;
        private readonly IMapper mapper;

        public AuthController(
            UserManager<User> userManager,
            ITokenGenerator userTokenGenerator,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.userTokenGenerator = userTokenGenerator;
            this.mapper = mapper;
        }

        [HttpPost("login")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LoginResponse>> LoginAsync(LoginRequest loginRequest)
        {
            var user = await userManager.FindByNameAsync(loginRequest.UserName);

            if (user == null)
            {
                return NotFound();
            }

            var isPasswordCorrect = await userManager.CheckPasswordAsync(user, loginRequest.Password);

            if (isPasswordCorrect == false)
            {
                return Unauthorized();
            }

            var userSummary = mapper.Map<UserSummary>(user);
            var token = userTokenGenerator.Generate(user);

            return Ok(new LoginResponse(userSummary, token));
        }
    }
}
