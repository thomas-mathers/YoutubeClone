﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Domain;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;

namespace YoutubeClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly IMapper mapper;

        public VideoController(DatabaseContext databaseContext, IMapper mapper)
        {
            this.databaseContext = databaseContext;    
            this.mapper = mapper;
        }

        [Authorize]
        [HttpPost("{videoId}/comments")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CommentSummary>> CreateComment(Guid videoId, CreateCommentRequest request)
        {
            var video = await databaseContext.Videos.FindAsync(videoId);

            if (video == null)
            {
                return NotFound();
            }

            var comment = new Comment(request.UserId, request.Text);

            video.AddComment(comment);

            await databaseContext.SaveChangesAsync();

            var commentSummary = mapper.Map<CommentSummary>(comment);

            return Ok(commentSummary);
        }

        [HttpGet]
        public async Task<ActionResult<List<VideoSummary>>> GetAsync()
        {
            var videos = await databaseContext.Videos.ToListAsync();
            var videoSummarys = videos.Select(x => mapper.Map<VideoSummary>(x)).ToList();
            return Ok(videoSummarys);
        }

        [Authorize]
        [ClaimsFilter]
        [HttpDelete("{videoId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteAsync(Guid claimsUserId, Guid claimsRoleId, Guid videoId)
        {
            var video = await databaseContext.Videos.Include(x => x.Channel).FirstOrDefaultAsync(x => x.Id == videoId);

            if (video == null)
            {
                return NotFound();
            }

            if (video.Channel.UserId != claimsUserId)
            {
                return Unauthorized();
            }

            databaseContext.Videos.Remove(video);

            await databaseContext.SaveChangesAsync();

            return Ok();
        }
    }
}
