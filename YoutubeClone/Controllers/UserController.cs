using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<UserSummary>>> GetAsync(
            [FromQuery] string? filterBy = nameof(Domain.User.UserName),
            [FromQuery] string? filter = null,
            [FromQuery] string? orderBy = nameof(Domain.User.DateCreated),
            [FromQuery] string? orderDir = "DESC",
            [FromQuery] DateTime? continuationToken = null,
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Users.AsQueryable();

            if (continuationToken != null)
            {
                query = query.Where(x => x.DateCreated > continuationToken);
            }

            if (string.IsNullOrEmpty(filter) == false)
            {
                switch (filterBy)
                {
                    case nameof(Domain.User.UserName):
                        query = query.Where(x => x.UserName.ToLower().Contains(filter.ToLower()));
                        break;
                    case nameof(Domain.User.GivenName):
                        query = query.Where(x => x.GivenName.ToLower().Contains(filter.ToLower()));
                        break;
                    case nameof(Domain.User.Surname):
                        query = query.Where(x => x.Surname.ToLower().Contains(filter.ToLower()));
                        break;
                    default:
                        query = query.Where(x => x.Email.ToLower().Contains(filter.ToLower()));
                        break;
                }
            }

            switch (orderBy)
            {
                case nameof(Domain.User.UserName):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.UserName) :
                        query.OrderByDescending(x => x.UserName);
                    break;
                case nameof(Domain.User.GivenName):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.GivenName) :
                        query.OrderByDescending(x => x.GivenName);
                    break;
                case nameof(Domain.User.Surname):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Surname) :
                        query.OrderByDescending(x => x.Surname);
                    break;
                case nameof(Domain.User.Email):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Email) :
                        query.OrderByDescending(x => x.Email);
                    break;
                default:
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.DateCreated) :
                        query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            var rows = await query.Take(take).ToListAsync();

            var page = new Page<UserSummary>
            {
                ContinuationToken = rows.LastOrDefault()?.DateCreated,
                Rows = rows.Select(x => mapper.Map<UserSummary>(x)).ToList()
            };

            return Ok(page);
        }

        [Authorize]
        [ClaimsFilter]
        [HttpPut("{userId}")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserSummary>> UpdateAsync(Guid claimsUserId, Guid claimsRoleId, Guid userId, UpdateUserRequest request)
        {
            if (userId != claimsUserId)
            {
                return Unauthorized();
            }

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

        [Authorize]
        [ClaimsFilter]
        [HttpPost("{userId}/channels")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ChannelSummary>> CreateChannelAsync(Guid claimsUserId, Guid claimsRoleId, Guid userId, CreateChannelRequest request)
        {
            if (userId != claimsUserId)
            {
                return Unauthorized();
            }

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

        [Authorize]
        [ClaimsFilter]
        [HttpPost("{userId}/subscriptions")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SubscriptionSummary>> CreateSubscriptionAsync(Guid claimsUserId, Guid claimsRoleId, Guid userId, CreateSubscriptionRequest request)
        {
            if (userId != claimsUserId)
            {
                return Unauthorized();
            }

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

        [Authorize]
        [ClaimsFilter]
        [HttpGet("{userId}/feed")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<VideoSummary>>> GetFeedItemsAsync(
            Guid claimsUserId,
            Guid claimsRoleId,
            Guid userId,
            [FromQuery] DateTime? continuationToken = null,
            [FromQuery] int take = 100)
        {
            if (userId != claimsUserId)
            {
                return Unauthorized();
            }

            var userChannels = databaseContext.Subscriptions.Where(s => s.UserId == userId).Select(s => s.ChannelId);

            var query = databaseContext.Videos.AsQueryable();

            if (continuationToken != null)
            {
                query = query.Where(x => x.DateCreated < continuationToken);
            }

            query = query.Join(userChannels, video => video.ChannelId, channelId => channelId, (video, channelId) => video).OrderByDescending(x => x.DateCreated);

            var rows = await query.Take(take).ToListAsync();

            var page = new Page<VideoSummary>
            {
                ContinuationToken = rows.LastOrDefault()?.DateCreated,
                Rows = rows.Select(x => mapper.Map<VideoSummary>(x)).ToList()
            };

            return Ok(page);
        }

        [Authorize]
        [ClaimsFilter]
        [HttpGet("{userId}/subscriptions")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<SubscriptionSummary>>> GetSubscriptionsAsync(
            Guid claimsUserId,
            Guid claimsRoleId,
            Guid userId,
            [FromQuery] DateTime? continuationToken = null,
            [FromQuery] int take = 100)
        {
            if (userId != claimsUserId)
            {
                return Unauthorized();
            }

            var query = databaseContext.Subscriptions.Include(s => s.Channel).Where(s => s.UserId == userId);

            if (continuationToken != null)
            {
                query = query.Where(x => x.DateCreated > continuationToken);
            }

            var rows = await query.Take(take).ToListAsync();

            var page = new Page<SubscriptionSummary>
            {
                ContinuationToken = rows.LastOrDefault()?.DateCreated,
                Rows = rows.Select(x => mapper.Map<SubscriptionSummary>(x)).ToList()
            };

            return Ok(page);
        }

        [Authorize]
        [ClaimsFilter]
        [HttpGet("{userId}/channels")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<ChannelSummary>>> GetChannelsAsync(
            Guid claimsUserId,
            Guid claimsRoleId,
            Guid userId,
            [FromQuery] DateTime? continuationToken = null,
            [FromQuery] int take = 100)
        {
            if (userId != claimsUserId)
            {
                return Unauthorized();
            }

            var query = databaseContext.Channels.Where(s => s.UserId == userId);

            if (continuationToken != null)
            {
                query = query.Where(x => x.DateCreated > continuationToken);
            }

            var rows = await query.Take(take).ToListAsync();

            var page = new Page<ChannelSummary>
            {
                ContinuationToken = rows.LastOrDefault()?.DateCreated,
                Rows = rows.Select(x => mapper.Map<ChannelSummary>(x)).ToList()
            };

            return Ok(page);
        }
    }
}
