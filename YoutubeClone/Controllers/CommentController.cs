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
        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CommentSummary>> CreateComment(CreateCommentRequest request)
        {
            var comment = new Comment(request.UserId, request.VideoId, request.Text) { ParentCommentId = request.ParentCommentId };

            databaseContext.Comments.Add(comment);

            await databaseContext.SaveChangesAsync();

            var commentSummary = mapper.Map<CommentSummary>(comment);

            return Ok(commentSummary);
        }


        [HttpGet("{commentId}/replies")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Page<CommentSummary>>> GetRepliesAsync(Guid commentId, [FromQuery] DateTime? continueToken, [FromQuery] int take = 100)
        {
            var query = databaseContext.Comments
                .Include(x => x.User)
                .Include(x => x.Replies)
                .Where(x => x.ParentCommentId == commentId);

            if (continueToken != null)
            {
                query = query.Where(x => x.DateCreated <= continueToken);
            }

            var rows = await query.OrderByDescending(x => x.DateCreated).Take(take + 1).ToListAsync();

            var page = new Page<CommentSummary>
            {
                ContinueToken = rows.Count == take + 1 ? rows.Last().DateCreated : null,
                Rows = rows.Take(take).Select(x =>
                {
                    var dto = mapper.Map<CommentSummary>(x);
                    dto.Replies = x.Replies.Count();
                    return dto;
                })
            };

            return Ok(page);
        }

        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Page<CommentSummary>>> GetAsync(
            [FromQuery] string? filterBy = nameof(Comment.Text), 
            [FromQuery] string? filter = null, 
            [FromQuery] string? orderBy = nameof(Comment.DateCreated),
            [FromQuery] string? orderDir = "DESC",
            [FromQuery] DateTime? continueToken = null,
            [FromQuery] int take = 100)
        {
            var query = databaseContext.Comments.Include(x => x.User).Include(x => x.Replies).AsQueryable();

            if (string.IsNullOrEmpty(filter) == false)
            {
                switch (filterBy)
                {
                    default:
                        query = query.Where(x => x.Text.Contains(filter));
                        break;
                }
            }

            if (continueToken != null)
            {
                query = query.Where(x => x.DateCreated <= continueToken);
            }

            switch (orderBy)
            {
                default:
                    query = orderDir == "ASC" ?
                        query.OrderBy(x => x.DateCreated) :
                        query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            var rows = await query.Take(take + 1).ToListAsync();

            var page = new Page<CommentSummary>
            {
                ContinueToken = rows.Count == take + 1 ? rows.Last().DateCreated : null,
                Rows = rows.Take(take).Select(x => 
                {
                    var dto = mapper.Map<CommentSummary>(x);
                    dto.Replies = x.Replies.Count();
                    return dto;
                })
            };

            return Ok(page);
        }
    }
}
