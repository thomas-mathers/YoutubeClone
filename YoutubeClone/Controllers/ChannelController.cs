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
        [DisableRequestSizeLimit]
        [HttpPost("{channelId}/videos")]
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

            var id = Guid.NewGuid();

            var url = await UploadChannelFile(channel, request.VideoFile, id);
            var thumbnailUrl = await UploadChannelFile(channel, request.ThumbnailFile, id);

            var video = new Video(id, channelId, request.Title, url, thumbnailUrl)
            {
                Description = request.Description
            };

            channel.AddVideo(video);

            await databaseContext.SaveChangesAsync();

            var videoSummary = mapper.Map<VideoSummary>(video);

            return Ok(videoSummary);
        }

        private async Task<string> UploadChannelFile(Channel channel, IFormFile file, Guid fileId)
        {
            using var fileStream = file.OpenReadStream();
            var filePath = $"channels/{channel.Id}/videos/{fileId}{Path.GetExtension(file.FileName)}";
            var url = await fileService.UploadAsync(filePath, fileStream);
            return url.AbsoluteUri;
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<ChannelSummary>>> GetAsync(
            [FromQuery] string? filterBy = nameof(Video.Title), 
            [FromQuery] string? filter = null, 
            [FromQuery] string? orderBy = nameof(Channel.DateCreated), 
            [FromQuery] string? orderDir = "DESC", 
            [FromQuery] DateTime? continueToken = null, 
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Channels.AsQueryable();

            if (string.IsNullOrEmpty(filter) == false)
            {
                switch (filterBy)
                {
                    case nameof(Channel.Description):
                        query = query.Where(x => x.Description.Contains(filter));
                        break;
                    default:
                        query = query.Where(x => x.Name.Contains(filter));
                        break;
                }
            }

            var totalRows = await query.LongCountAsync();

            if (continueToken != null)
            {
                query = query.Where(x => x.DateCreated < continueToken);
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
                ContinueToken = rows.LastOrDefault()?.DateCreated, 
                TotalRows = totalRows,
                Rows = rows.Select(x => mapper.Map<ChannelSummary>(x)).ToList() 
            };

            return Ok(page);
        }

        [HttpGet("{channelId}/videos")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<VideoSummary>>> GetVideosAsync(
            Guid channelId, 
            [FromQuery] string? filterBy = nameof(Video.Title), 
            [FromQuery] string? filter = null, 
            [FromQuery] string? orderBy = nameof(Video.DateCreated), 
            [FromQuery] string? orderDir = "DESC", 
            [FromQuery] DateTime? continueToken = null, 
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Videos.Where(x => x.ChannelId == channelId);

            if (string.IsNullOrEmpty(filter) == false)
            {
                switch (filterBy)
                {
                    case nameof(Video.Description):
                        query = query.Where(x => x.Description.Contains(filter));
                        break;
                    default:
                        query = query.Where(x => x.Title.Contains(filter));
                        break;
                }
            }

            var totalRows = await query.LongCountAsync();

            if (continueToken != null)
            {
                query = query.Where(x => x.DateCreated < continueToken);
            }

            switch (orderBy)
            {
                case nameof(Video.Title):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Title) :
                        query.OrderByDescending(x => x.Title);
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
                ContinueToken = rows.LastOrDefault()?.DateCreated,
                TotalRows = totalRows,
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
