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
        public async Task<ActionResult<List<string>>> GetAsync([FromQuery] string prefix, [FromQuery] int take)
        {
            var suggestions = await databaseContext.Videos
                .Select(v => v.Name)
                .Where(s => s.ToLower().StartsWith(prefix.ToLower()))
                .OrderBy(s => s)
                .Take(take)
                .ToListAsync();
            return Ok(suggestions);
        }
    }
}
