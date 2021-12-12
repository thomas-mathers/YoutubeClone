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
        public async Task<ActionResult<List<ChannelSummary>>> GetAsync()
        {
            var channels = await databaseContext.Channels.ToListAsync();
            var channelSummarys = channels.Select(x => mapper.Map<ChannelSummary>(x)).ToList();
            return Ok(channelSummarys);
        }

        [HttpGet("{channelId}/videos")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<VideoSummary>>> GetVideosAsync(Guid channelId)
        {
            var videos = await databaseContext.Videos.Where(v => v.ChannelId == channelId).ToListAsync();
            var videoSummarys = videos.Select(v => mapper.Map<VideoSummary>(v)).ToList();
            return Ok(videoSummarys);
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
