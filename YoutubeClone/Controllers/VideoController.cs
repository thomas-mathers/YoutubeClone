using AutoMapper;
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

        [HttpGet("{videoId}/comments")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Page<CommentSummary>>> GetCommentsAsync(Guid videoId, [FromQuery] DateTime? continueToken = null, [FromQuery] int take = 100)
        {
            var query = databaseContext.Comments.Include(x => x.User).Where(x => x.VideoId == videoId && x.ParentCommentId == null);

            if (continueToken != null)
            {
                query = query.Where(x => x.DateCreated <= continueToken);
            }

            query = query.OrderByDescending(x => x.DateCreated);

            var rows = await query.Take(take + 1).ToListAsync();

            var page = new Page<CommentSummary>
            {
                ContinueToken = rows.Count == take + 1 ? rows.Last().DateCreated : null,
                Rows = rows.Take(take).Select(mapper.Map<CommentSummary>).ToList()
            };

            return Ok(page);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VideoDetail>> GetAsync(Guid id)
        {
            var video = await databaseContext.Videos.Include(x => x.Channel).ThenInclude(x => x.Subscriptions).FirstOrDefaultAsync(x => x.Id == id);

            if (video == null)
            {
                return NotFound();
            }

            var videoDetail = mapper.Map<VideoDetail>(video);

            return Ok(videoDetail);
        }

        [HttpGet]
        public async Task<ActionResult<Page<VideoSummary>>> GetAllAsync(
            [FromQuery] string? filterBy = nameof(Video.Title), 
            [FromQuery] string? filter = null, 
            [FromQuery] string? orderBy = nameof(Video.DateCreated), 
            [FromQuery] string? orderDir = "DESC", 
            [FromQuery] DateTime? continueToken = null, 
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Videos.AsQueryable();

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

            if (continueToken != null)
            {
                query = query.Where(x => x.DateCreated <= continueToken);
            }

            switch (orderBy)
            {
                case nameof(Video.Description):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Description) :
                        query.OrderByDescending(x => x.Description);
                    break;
                case nameof(Video.Title):
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.Title) :
                        query.OrderByDescending(x => x.Title);
                    break;
                default:
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.DateCreated) :
                        query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            var rows = await query.Take(take + 1).ToListAsync();

            var page = new Page<VideoSummary>
            {
                ContinueToken = rows.Count == take + 1 ? rows.Last().DateCreated : null,
                Rows = rows.Take(take).Select(mapper.Map<VideoSummary>).ToList()
            };

            return Ok(page);
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
