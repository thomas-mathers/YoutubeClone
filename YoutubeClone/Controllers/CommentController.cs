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
    public class CommentController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly IMapper mapper;

        public CommentController(DatabaseContext databaseContext, IMapper mapper)
        {
            this.databaseContext = databaseContext;
            this.mapper = mapper;
        }

        [Authorize]
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
        public async Task<ActionResult<Page<CommentSummary>>> GetAsync(
            [FromQuery] string? filterBy = nameof(Comment.Text), 
            [FromQuery] string? filter = null, 
            [FromQuery] string orderBy = nameof(Comment.DateCreated),
            [FromQuery] string orderDir = "ASC", 
            [FromQuery] long continuationToken = 0, 
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Comments.Where(x => x.DateCreated.Ticks > continuationToken);

            if (string.IsNullOrEmpty(filter) == false)
            {
                switch (filterBy)
                {
                    default:
                        query = query.Where(x => x.Text.ToLower().Contains(filter.ToLower()));
                        break;
                }
            }

            switch (orderBy)
            {
                default:
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.DateCreated) :
                        query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            var rows = await query.Take(take).ToListAsync();

            var page = new Page<CommentSummary>
            {
                ContinuationToken = rows.Count > 0 ? rows.Last().DateCreated.Ticks : null,
                Rows = rows.Select(x => mapper.Map<CommentSummary>(x)).ToList()
            };

            return Ok(page);
        }
    }
}
