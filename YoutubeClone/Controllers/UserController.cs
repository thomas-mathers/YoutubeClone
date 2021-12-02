using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Domain;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;
using YoutubeClone.Infrastructure.Services;

namespace YoutubeClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly UserManager<User> userManager;
        private readonly ITokenGenerator userTokenGenerator;
        private readonly IMapper mapper;

        public UserController(
            DatabaseContext context,
            UserManager<User> userManager,
            ITokenGenerator userTokenGenerator,
            IMapper mapper)
        {
            this.databaseContext = context;
            this.userManager = userManager;
            this.userTokenGenerator = userTokenGenerator;
            this.mapper = mapper;
        }

        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserSummary>> CreateAsync(CreateUserRequest createUserRequest)
        {
            var user = new User(createUserRequest.Email) { GivenName = createUserRequest.GivenName, Surname = createUserRequest.Surname, ProfilePictureUrl = createUserRequest.ProfilePictureUrl, PhoneNumber = createUserRequest.PhoneNumber };

            var createResult = await userManager.CreateAsync(user, createUserRequest.Password);

            if (createResult.Succeeded == false)
            {
                return BadRequest(createResult.Errors);
            }

            var userSummary = mapper.Map<UserSummary>(user);

            return Ok(userSummary);
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<List<UserSummary>>> GetAsync()
        {
            var users = await databaseContext.Users.ToListAsync();
            var userSummarys = users.Select(x => mapper.Map<UserSummary>(x)).ToList();
            return Ok(userSummarys);
        }

        [HttpPut("{userId}")]
        public async Task<ActionResult<UserSummary>> UpdateAsync(Guid userId, UpdateUserRequest request)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                return NotFound();
            }

            user.GivenName = request.GivenName;
            user.Surname = request.Surname;
            user.ProfilePictureUrl = request.ProfilePictureUrl;

            var phoneNumberChanged = request.PhoneNumber != user.PhoneNumber;

            user.PhoneNumber = request.PhoneNumber;

            if (phoneNumberChanged)
            {
                user.PhoneNumberConfirmed = false;
            }

            var userSummary = mapper.Map<UserSummary>(user);

            return Ok(userSummary);
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

        [HttpPost("{userId}/channels")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ChannelSummary>> CreateChannelAsync(Guid userId, CreateChannelRequest request)
        {
            var user = await databaseContext.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            var channel = new Channel(user.Id, request.Name);

            user.AddChannel(channel);

            await databaseContext.SaveChangesAsync();

            var channelSummary = mapper.Map<ChannelSummary>(channel);

            return Ok(channelSummary);
        }

        [HttpPost("{userId}/subscriptions")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SubscriptionSummary>> CreateSubscriptionAsync(Guid userId, CreateSubscriptionRequest request)
        {
            var user = await databaseContext.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            var subscription = new Subscription(user.Id, request.ChannelId);

            user.AddSubscription(subscription);

            await databaseContext.SaveChangesAsync();

            var subscriptionSummary = mapper.Map<SubscriptionSummary>(subscription);

            return Ok(subscriptionSummary);
        }
    }
}
