using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeClone.Domain;
using YoutubeClone.DTO;
using YoutubeClone.Infrastructure;

namespace YoutubeClone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly IMapper mapper;

        public CommentController(DatabaseContext databaseContext, IMapper mapper)
        {
            this.databaseContext = databaseContext;
            this.mapper = mapper;
        }

        [HttpPost("{commentId}/replies")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CommentSummary>> CreateReplyAsync(Guid commentId, CreateReplyRequest request)
        {
            var comment = await databaseContext.Comments.FindAsync(commentId);

            if (comment == null)
            {
                return NotFound();
            }

            var reply = new Comment(request.Id, request.Text);

            comment.AddReply(reply);

            await databaseContext.SaveChangesAsync();

            var replySummary = mapper.Map<CommentSummary>(reply);

            return Ok(replySummary);
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<CommentSummary>>> GetAsync()
        {
            var channels = await databaseContext.Comments.ToListAsync();
            var channelSummarys = channels.Select(x => mapper.Map<CommentSummary>(x)).ToList();
            return Ok(channelSummarys);
        }
    }
}
