using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Infrastructure;

namespace YoutubeClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoSuggestionsController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;

        public VideoSuggestionsController(DatabaseContext databaseContext)
        {
            this.databaseContext = databaseContext;
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<string>>> GetAsync([FromQuery] string prefix, [FromQuery] int take = 3)
        {
            var suggestions = await databaseContext.Videos
                .Select(v => v.Title)
                .Distinct()
                .Where(s => s.StartsWith(prefix))
                .OrderBy(s => s)
                .Take(take)
                .ToListAsync();
            return Ok(suggestions);
        }
    }
}
