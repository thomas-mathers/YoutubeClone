using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    public class ChannelController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly IMapper mapper;
        private readonly IFileService fileService;

        public ChannelController(DatabaseContext databaseContext, IMapper mapper, IFileService fileService)
        {
            this.databaseContext = databaseContext;
            this.mapper = mapper;
            this.fileService = fileService;
        }

        [Authorize]
        [ClaimsFilter]
        [HttpPost("{channelId}/videos")]
        [RequestSizeLimit(100_000_000)]
        [Consumes("multipart/form-data")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VideoSummary>> CreateVideoAsync(Guid claimsUserId, Guid claimsRoleId, Guid channelId, [FromForm] CreateVideoRequest request)
        {
            var channel = await databaseContext.Channels.FindAsync(channelId);

            if (channel == null)
            {
                return NotFound();
            }

            if (channel.UserId != claimsUserId)
            {
                return Unauthorized();
            }

            using var fileStream = request.File.OpenReadStream();

            var videoId = Guid.NewGuid();

            var blobPath = $"channels/{channel.Id}/videos/{videoId}.mp4";

            var videoUrl = await fileService.UploadAsync(blobPath, fileStream);

            var video = new Video(videoId, channelId, request.Name, videoUrl.ToString(), videoUrl.ToString());

            channel.AddVideo(video);

            await databaseContext.SaveChangesAsync();

            var videoSummary = mapper.Map<VideoSummary>(video);

            return Ok(videoSummary);
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<ChannelSummary>>> GetAsync(
            [FromQuery] string? filterBy = nameof(Video.Name), 
            [FromQuery] string? filter = null, 
            [FromQuery] string orderBy = nameof(Channel.DateCreated), 
            [FromQuery] string orderDir = "ASC", 
            [FromQuery] DateTime? continuationToken = null, 
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Channels.AsQueryable();
            
            if (continuationToken != null)
            {
                query = query.Where(x => x.DateCreated > continuationToken);
            }

            if (string.IsNullOrEmpty(filter) == false)
            {
                switch (filterBy)
                {
                    case nameof(Channel.Description):
                        query = query.Where(x => x.Description.ToLower().Contains(filter.ToLower()));
                        break;
                    default:
                        query = query.Where(x => x.Name.ToLower().Contains(filter.ToLower()));
                        break;
                }                
            }

            switch (orderBy)
            {
                case nameof(Channel.Name):
                    query = orderDir == "ASC" ? 
                        query.OrderBy(x => x.Name) : 
                        query.OrderByDescending(x => x.Name);
                    break;
                default:
                    query = orderDir == "ASC" ? 
                        query.OrderBy(x => x.DateCreated) : 
                        query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            var rows = await query.Take(take).ToListAsync();
           
            var page = new Page<ChannelSummary> 
            {
                ContinuationToken = rows.LastOrDefault()?.DateCreated, 
                Rows = rows.Select(x => mapper.Map<ChannelSummary>(x)).ToList() 
            };

            return Ok(page);
        }

        [HttpGet("{channelId}/videos")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<VideoSummary>>> GetVideosAsync(
            Guid channelId, 
            [FromQuery] string? filterBy = nameof(Video.Name), 
            [FromQuery] string? filter = null, 
            [FromQuery] string orderBy = nameof(Video.DateCreated), 
            [FromQuery] string orderDir = "ASC", 
            [FromQuery] DateTime? continuationToken = null, 
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Videos.Where(x => x.ChannelId == channelId);

            if (continuationToken != null)
            {
                query = query.Where(x => x.DateCreated > continuationToken);
            }

            if (string.IsNullOrEmpty(filter) == false)
            {
                switch (filterBy)
                {
                    case nameof(Video.Description):
                        query = query.Where(x => x.Description.ToLower().Contains(filter.ToLower()));
                        break;
                    default:
                        query = query.Where(x => x.Name.ToLower().Contains(filter.ToLower()));
                        break;
                }
            }

            switch (orderBy)
            {
                case nameof(Video.Name):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Name) :
                        query.OrderByDescending(x => x.Name);
                    break;
                case nameof(Video.Likes):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Likes) :
                        query.OrderByDescending(x => x.Likes);
                    break;
                case nameof(Video.Dislikes):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Dislikes) :
                        query.OrderByDescending(x => x.Dislikes);
                    break;
                default:
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.DateCreated) :
                        query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            var rows = await query.Take(take).ToListAsync();

            var page = new Page<VideoSummary>
            {
                ContinuationToken = rows.LastOrDefault()?.DateCreated,
                Rows = rows.Select(v => mapper.Map<VideoSummary>(v)).ToList()
            };

            return Ok(page);
        }

        [Authorize]
        [ClaimsFilter]
        [HttpDelete("{channelId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAsync(Guid claimsUserId, Guid claimsRoleId, Guid channelId)
        {
            var channel = await databaseContext.Channels.FindAsync(channelId);

            if (channel == null)
            {
                return NotFound();
            }

            if (channel.UserId != claimsUserId)
            {
                return Unauthorized();
            }

            databaseContext.Channels.Remove(channel);

            await databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
