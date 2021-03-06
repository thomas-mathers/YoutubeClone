using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;

namespace YoutubeClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly IMapper mapper;

        public FeedController(DatabaseContext context, IMapper mapper)
        {
            this.databaseContext = context;
            this.mapper = mapper;
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<VideoSummary>>> GetFeedItemsAsync(
            [FromQuery] DateTime? continueToken = null,
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Videos.AsQueryable();

            if (continueToken != null)
            {
                query = query.Where(x => x.DateCreated <= continueToken);
            }

            var rows = await query.Take(take + 1).ToListAsync();

            var page = new Page<VideoSummary>
            {
                ContinueToken = rows.Count == take + 1 ? rows.Last().DateCreated : null,
                Rows = rows.Take(take).Select(x => mapper.Map<VideoSummary>(x)).ToList()
            };

            return Ok(page);
        }
    }
}
